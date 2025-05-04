import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateChildArgs, DeleteChildArgs, UpdateChildArgs } from './dto';

@Injectable()
export class ChildService {
  constructor(private prisma: PrismaService) {}

  // 자식 컴포넌트 목록 조회
  findManyChild(componentId: number) {
    return this.prisma.child.findMany({
      where: { componentId, isDelete: false },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 자식 컴포넌트 생성
  async createChild({ componentId }: CreateChildArgs, adminId: number) {
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

      const child = await tx.child.create({
        data: {
          component: {
            connect: {
              id: componentId,
            },
          },
        },
      });

      await tx.childStyle.create({
        data: {
          child: {
            connect: {
              id: child.id,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '자식 컴포넌트 생성',
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
          child: {
            connect: {
              id: child.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 자식 컴포넌트 수정
  async updateChild(
    { id, title, content, childStyle }: UpdateChildArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const child = await tx.child.update({
        where: { id },
        data: {
          title,
          content,
          childStyle: {
            update: { ...childStyle },
          },
        },
      });

      const site = await tx.site.findFirst({
        where: {
          components: {
            some: {
              id: child.componentId,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '자식 컴포넌트 수정',
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
          child: {
            connect: {
              id: child.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 자식 컴포넌트 삭제
  async deleteChild({ id }: DeleteChildArgs, adminId: number) {
    await this.prisma.$transaction(async (tx) => {
      const child = await tx.child.update({
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
              id: child.componentId,
            },
          },
        },
      });

      await tx.history.create({
        data: {
          description: '자식 컴포넌트 삭제',
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
          child: {
            connect: {
              id: child.id,
            },
          },
        },
      });
    });

    return true;
  }
}
