import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class AdminAccessStrategy extends PassportStrategy(
  Strategy,
  'admin-access',
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
      return new UnauthorizedException();
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    return admin;
  }
}
