import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SendVerifyCodeArgs, VerifyEmailArgs } from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class AuthService {
  private transporter;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private prisma: PrismaService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // 랜덤 6자리 숫자 생성
  private generateRandomNumber(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 이메일 인증번호 발송
  async sendVerifyCode({ email }: SendVerifyCodeArgs) {
    const checkEmail = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      throw new BadRequestException({
        message: '이미 등록된 이메일입니다.',
      });
    }

    const verifyCode = this.generateRandomNumber().toString();

    const emailOptions: EmailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: '회원가입 인증코드 이메일입니다.',
      html: `<h1> 인증 코드를 입력하면 가입 인증이 완료됩니다.</h1><br/>${verifyCode}`,
    };

    await this.cacheManager.set(email, verifyCode, { ttl: 180 } as any);

    await this.transporter.sendMail(emailOptions);

    return true;
  }

  async verifyEmail({ email, verifyCode }: VerifyEmailArgs) {
    const redisCode = await this.cacheManager.get(email);

    if (!redisCode) {
      throw new BadRequestException('인증 시간이 만료되었습니다.');
    }

    if (verifyCode !== redisCode) {
      throw new BadRequestException('인증 코드가 일치하지 않습니다.');
    }

    // 인증코드 삭제
    await this.cacheManager.del(email);

    return true;
  }
}
