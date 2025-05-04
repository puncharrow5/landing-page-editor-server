import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateHeaderArgs, UpdateMobileHeaderArgs } from './dto';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HeaderService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  // 헤더 조회
  findHeader(siteId: number) {
    return this.prisma.header.findUnique({
      where: { siteId },
    });
  }

  // 모바일 헤더 조회
  findMobileHeader(siteId: number) {
    return this.prisma.mobileHeader.findUnique({
      where: { siteId },
    });
  }

  // 헤더 수정
  async updateHeader(
    {
      siteId,
      logo,
      logoSize,
      height,
      padding,
      gap,
      backgroundColor,
      textColor,
      textSize,
    }: UpdateHeaderArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await tx.header.upsert({
        where: {
          siteId,
        },
        create: {
          logo,
          logoSize,
          height,
          padding,
          gap,
          backgroundColor,
          textColor,
          textSize,
          site: {
            connect: {
              id: siteId,
            },
          },
        },
        update: {
          logo,
          logoSize,
          height,
          padding,
          gap,
          backgroundColor,
          textColor,
          textSize,
        },
      });

      await tx.history.create({
        data: {
          description: '헤더 수정',
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: siteId,
            },
          },
        },
      });
    });

    return true;
  }

  // 모바일 헤더 수정
  async updateMobileHeader(
    {
      siteId,
      logo,
      logoSize,
      button,
      buttonSize,
      height,
      padding,
      menuPadding,
      backgroundColor,
      menuBackgroundColor,
      textColor,
      textSize,
    }: UpdateMobileHeaderArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await this.prisma.mobileHeader.upsert({
        where: {
          siteId,
        },
        create: {
          logo,
          logoSize,
          button,
          buttonSize,
          height,
          padding,
          menuPadding,
          backgroundColor,
          menuBackgroundColor,
          textColor,
          textSize,
          site: {
            connect: {
              id: siteId,
            },
          },
        },
        update: {
          logo,
          logoSize,
          button,
          buttonSize,
          height,
          padding,
          menuPadding,
          backgroundColor,
          menuBackgroundColor,
          textColor,
          textSize,
        },
      });

      await tx.history.create({
        data: {
          description: '모바일 헤더 수정',
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: siteId,
            },
          },
        },
      });
    });

    return true;
  }
}
