import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateMobileChildArgs,
  DeleteMobileChildArgs,
  UpdateMobileChildArgs,
} from './dto';

@Injectable()
export class MobileChildService {
  constructor(private prisma: PrismaService) {}

  // 모바일 자식 컴포넌트 목록 조회
  findManyMobileChild(componentId: number) {
    return this.prisma.mobileChild.findMany({
      where: { componentId, isDelete: false },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 모바일 자식 컴포넌트 생성
  async createMobileChild(
    { componentId }: CreateMobileChildArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const site = await tx.site.findFirst({
        where: {
          components: {
            some: {
              id: componentId,
            },
          },
        },
      });

      const mobileChild = await tx.mobileChild.create({
        data: {
          component: {
            connect: {
              id: componentId,
            },
          },
        },
      });

      await tx.mobileChildStyle.create({
        data: {
          mobileChild: {
            connect: {
              id: mobileChild.id,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '모바일 자식 컴포넌트 생성',
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
          mobileChild: {
            connect: {
              id: mobileChild.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 모바일 자식 컴포넌트 수정
  async updateMobileChild(
    { id, title, content, mobileChildStyle }: UpdateMobileChildArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const mobileChild = await tx.mobileChild.update({
        where: { id },
        data: {
          title,
          content,
          mobileChildStyle: {
            update: { ...mobileChildStyle },
          },
        },
      });

      const site = await tx.site.findFirst({
        where: {
          components: {
            some: {
              id: mobileChild.componentId,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '모바일 자식 컴포넌트 수정',
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
          mobileChild: {
            connect: {
              id: mobileChild.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 모바일 자식 컴포넌트 삭제
  async deleteMobileChild({ id }: DeleteMobileChildArgs, adminId: number) {
    await this.prisma.$transaction(async (tx) => {
      const mobileChild = await tx.mobileChild.update({
        where: {
          id,
        },
        data: {
          isDelete: true,
        },
      });

      const site = await tx.site.findFirst({
        where: {
          components: {
            some: {
              id: mobileChild.componentId,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '모바일 자식 컴포넌트 삭제',
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
          mobileChild: {
            connect: {
              id: mobileChild.id,
            },
          },
        },
      });
    });

    return true;
  }
}
