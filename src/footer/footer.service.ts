import { FileService } from 'src/file/file.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { UpdateFooterArgs, UpdateMobileFooterArgs } from './dto';

@Injectable()
export class FooterService {
  constructor(private prisma: PrismaService) {}

  // 푸터 조회
  findFooter(siteId: number) {
    return this.prisma.footer.findUnique({
      where: { siteId },
    });
  }

  // 모바일 푸터 조회
  findMobileFooter(siteId: number) {
    return this.prisma.mobileFooter.findUnique({
      where: { siteId },
    });
  }

  // 푸터 수정
  async updateFooter(
    {
      siteId,
      footerType,
      logo,
      logoSize,
      contentTop,
      helpCenter,
      terms,
      contentBottom,
      backgroundColor,
      paddingTop,
      paddingBottom,
      textColor,
      textSize,
      lineHeight,
    }: UpdateFooterArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await tx.footer.upsert({
        where: {
          siteId,
        },
        create: {
          footerType,
          logo,
          logoSize,
          contentTop,
          helpCenter,
          terms,
          contentBottom,
          backgroundColor,
          paddingTop,
          paddingBottom,
          textColor,
          textSize,
          lineHeight,
          site: {
            connect: {
              id: siteId,
            },
          },
        },
        update: {
          footerType,
          logo,
          logoSize,
          contentTop,
          helpCenter,
          terms,
          contentBottom,
          backgroundColor,
          paddingTop,
          paddingBottom,
          textColor,
          textSize,
          lineHeight,
        },
      });

      await tx.history.create({
        data: {
          description: '푸터 수정',
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

  // 모바일 푸터 수정
  async updateMobileFooter(
    {
      siteId,
      footerType,
      logo,
      logoSize,
      contentTop,
      helpCenter,
      terms,
      contentBottom,
      backgroundColor,
      paddingTop,
      paddingBottom,
      textColor,
      textSize,
      lineHeight,
    }: UpdateMobileFooterArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await tx.mobileFooter.upsert({
        where: {
          siteId,
        },
        create: {
          footerType,
          logo,
          logoSize,
          contentTop,
          helpCenter,
          terms,
          contentBottom,
          backgroundColor,
          paddingTop,
          paddingBottom,
          textColor,
          textSize,
          lineHeight,
          site: {
            connect: {
              id: siteId,
            },
          },
        },
        update: {
          footerType,
          logo,
          logoSize,
          contentTop,
          helpCenter,
          terms,
          contentBottom,
          backgroundColor,
          paddingTop,
          paddingBottom,
          textColor,
          textSize,
          lineHeight,
        },
      });

      await tx.history.create({
        data: {
          description: '모바일 푸터 수정',
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
