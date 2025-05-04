import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  ConnectSiteArgs,
  CreateSiteArgs,
  FindOneSiteByDomainArgs,
  FindOneSiteByIdArgs,
} from './dto';
import { DisconnectSiteArgs } from './dto/disconnect-site.args';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  // 사이트 조회
  findOneSite(siteId: number) {
    return this.prisma.site.findUnique({
      where: { id: siteId },
    });
  }

  // ID로 사이트 조회
  async findOneSiteById({ id }: FindOneSiteByIdArgs) {
    const site = await this.prisma.site.findUnique({
      where: { id },
    });

    if (!site) {
      throw new BadRequestException('존재하지 않는 사이트입니다.');
    }

    return site;
  }

  // 도메인으로 사이트 조회
  async findOneSiteByDomain({ domain }: FindOneSiteByDomainArgs) {
    const site = await this.prisma.site.findUnique({
      where: { domain },
    });

    if (!site) {
      throw new BadRequestException('존재하지 않는 사이트입니다.');
    }

    return site;
  }

  // 사이트 목록 조회
  async findManySite(adminId: number) {
    return await this.prisma.site.findMany({
      where: {
        admins: {
          some: {
            id: adminId,
          },
        },
      },
    });
  }

  // 사이트 생성
  async createSite({ domain, name, email }: CreateSiteArgs, adminId: number) {
    await this.prisma.$transaction(async (tx) => {
      const checkDomain = await tx.site.findUnique({
        where: { domain },
      });

      if (checkDomain) {
        throw new BadRequestException('이미 등록된 도메인입니다.');
      }

      const site = await tx.site.create({
        data: {
          name,
          email,
          domain,
          admins: {
            connect: {
              id: adminId,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '사이트 생성',
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: site.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 사이트 연결
  async connectSite({ domain }: ConnectSiteArgs, adminId: number) {
    await this.prisma.$transaction(async (tx) => {
      const site = await tx.site.findUnique({
        where: { domain },
        include: {
          admins: true,
        },
      });

      if (!site) {
        throw new BadRequestException('존재하지 않는 도메인입니다.');
      }

      const alreadyConnected = site.admins.some(
        (admin) => admin.id === adminId,
      );
      if (alreadyConnected) {
        throw new BadRequestException('이미 해당 계정과 연결된 도메인입니다.');
      }

      await this.prisma.site.update({
        where: {
          domain,
        },
        data: {
          admins: {
            connect: {
              id: adminId,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '사이트 연결',
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: site.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 사이트 연결 해제
  async disconnectSite({ id }: DisconnectSiteArgs, adminId: number) {
    await this.prisma.$transaction(async (tx) => {
      const site = await this.prisma.site.update({
        where: {
          id,
        },
        data: {
          admins: {
            disconnect: {
              id: adminId,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '사이트 연결 해제',
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: site.id,
            },
          },
        },
      });
    });

    return true;
  }
}
