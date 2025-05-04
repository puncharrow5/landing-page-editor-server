import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class AdminUpdateAccessStrategy extends PassportStrategy(
  Strategy,
  'admin-update-access',
) {
  constructor(private prisma: PrismaService) {
    super({
      name: 'jwt',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.accessToken;
        },
      ]),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload.id) {
      throw new UnauthorizedException({
        message: '정상적인 토큰이 아닙니다. 다시 로그인 해주시기 바랍니다.',
      });
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (admin.role.id < 3) {
      throw new BadRequestException({
        message: '해당 계정은 사이트 수정 권한이 없습니다.',
      });
    }

    return admin;
  }
}
