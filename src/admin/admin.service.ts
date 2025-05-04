import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import {
  CreateAdminArgs,
  LoginWithEmailArgs,
  UpdateProfileImageArgs,
} from './dto';
import { CookieOptions, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AdminEntity } from '@libs/entity';
import { FileService } from 'src/file/file.service';
import { regexEmoji } from 'libs/util/src';

@Injectable()
export class AdminService {
  private accessTokenOption: CookieOptions = {
    httpOnly: true,
    path: '/',
  };
  private refreshTokenOption: CookieOptions = {
    httpOnly: true,
    path: '/',
  };

  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly fileService: FileService,
  ) {}

  // AccessToken 발급
  createAccessToken(id: number, email: string) {
    const accessToken = this.jwtService.sign(
      {
        id,
        email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: '1h',
      },
    );
    return accessToken;
  }

  // RefreshToken 발급
  createRefreshToken(id: number, email: string) {
    const refreshToken = this.jwtService.sign(
      {
        id,
        email,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: '7d',
      },
    );
    return refreshToken;
  }

  // 회원가입
  async createAdmin({
    email,
    password,
    confirmPassword,
    name,
  }: CreateAdminArgs) {
    if (regexEmoji.test(name)) {
      throw new BadRequestException({
        message: '이름에는 이모지를 사용할 수 없습니다.',
      });
    }

    if (password !== confirmPassword) {
      throw new BadRequestException({
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    const checkEmail = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      throw new BadRequestException({ message: '이미 등록된 이메일입니다.' });
    }

    const hashedPassword = await argon2.hash(password);

    await this.prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: {
          connect: {
            id: 1,
          },
        },
      },
    });

    return true;
  }

  // 로그인
  async loginWithEmail({ email, password }: LoginWithEmailArgs, res: Response) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    if (!admin) {
      throw new BadRequestException('이메일을 확인해주세요.');
    }

    const verifyPassword = await argon2.verify(admin.password, password);

    if (!verifyPassword) {
      throw new BadRequestException('비밀번호를 확인해주세요.');
    }

    if (admin.roleId === 0) {
      throw new BadRequestException('승인 대기 중인 계정입니다.');
    }

    // Access Token / Refresh Token 생성
    const accessToken = this.createAccessToken(admin.id, admin.email);
    const refreshToken = this.createRefreshToken(admin.id, admin.email);

    await this.prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        refreshToken,
      },
    });

    res.cookie('accessToken', accessToken, this.accessTokenOption);
    res.cookie('refreshToken', refreshToken, this.refreshTokenOption);

    return true;
  }

  // 로그아웃
  async logout(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return true;
  }

  // AccessToken 재발급
  async getNewAccessToken(res: Response, refreshToken?: string) {
    if (!refreshToken) {
      await this.logout(res);

      throw new BadRequestException(
        '토큰이 만료되었습니다 다시 로그인 해주세요.',
      );
    }

    const payload: any = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });

    const admin = await this.prisma.admin.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
        refreshToken: true,
      },
    });

    if (!admin) {
      await this.logout(res);

      throw new BadRequestException('유저 정보가 조회되지 않습니다.');
    }

    if (admin.refreshToken !== refreshToken) {
      await this.logout(res);

      throw new BadRequestException(
        '토큰이 만료되었습니다 다시 로그인 해주세요.',
      );
    }

    const newAccessToken = this.createAccessToken(admin.id, admin.email);
    const newRefreshToken = this.createRefreshToken(admin.id, admin.email);

    await this.prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    res.cookie('accessToken', newAccessToken, this.accessTokenOption);
    res.cookie('refreshToken', newRefreshToken, this.refreshTokenOption);

    return true;
  }

  // 관리자 ID로 관리자 조회
  findAdmin(id: number): Promise<AdminEntity> {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  // 프로필 이미지 변경
  async updateProfileImage(id: number, { file }: UpdateProfileImageArgs) {
    const imageKey = (await this.fileService.uploadImage({ file })) as string;

    await this.prisma.admin.update({
      where: { id },
      data: { profileImage: imageKey },
    });

    return true;
  }
}
