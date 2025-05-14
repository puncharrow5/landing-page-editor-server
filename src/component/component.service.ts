import { Injectable } from '@nestjs/common';
import {
  CreateComponentArgs,
  DeleteComponentArgs,
  UpdateComponentArgs,
} from './dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  // 컴포넌트 목록 조회
  findManyComponent(siteId: number) {
    return this.prisma.component.findMany({
      where: { siteId, isDelete: false },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 컴포넌트 생성
  async createComponent(
    { siteId, componentType, name }: CreateComponentArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const component = await tx.component.create({
        data: {
          componentType,
          name,
          site: {
            connect: {
              id: siteId,
            },
          },
        },
      });

      const createStyleEntity = async (entity) => {
        await entity.create({
          data: {
            component: {
              connect: {
                id: component.id,
              },
            },
          },
        });
      };

      await createStyleEntity(tx.componentStyle);
      await createStyleEntity(tx.componentMobileStyle);
      await createStyleEntity(tx.titleStyle);
      await createStyleEntity(tx.contentStyle);

      if (componentType === 'INQUIRY') {
        await createStyleEntity(tx.inquiryStyle);
        await createStyleEntity(tx.mobileInquiryStyle);
      }

      await tx.history.create({
        data: {
          description: '컴포넌트 생성',
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
          component: {
            connect: {
              id: component.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 컴포넌트 수정
  async updateComponent(
    {
      id,
      name,
      componentStyle,
      componentMobileStyle,
      title,
      mobileTitle,
      titleStyle,
      content,
      mobileContent,
      contentStyle,
      inquiryStyle,
      mobileInquiryStyle,
    }: UpdateComponentArgs,
    adminId: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const component = await tx.component.update({
        where: { id },
        data: {
          name,
          title,
          mobileTitle,
          content,
          mobileContent,
          componentStyle: {
            update: { ...componentStyle },
          },
          componentMobileStyle: {
            update: {
              ...componentMobileStyle,
            },
          },
          titleStyle: { update: { ...titleStyle } },
          contentStyle: { update: { ...contentStyle } },
          inquiryStyle: { update: { ...inquiryStyle } },
          mobileInquiryStyle: { update: { ...mobileInquiryStyle } },
        },
      });

      await tx.history.create({
        data: {
          description: '컴포넌트 수정',
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: component.siteId,
            },
          },
          component: {
            connect: {
              id: component.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 컴포넌트 삭제
  async deleteComponent({ id }: DeleteComponentArgs, adminId: number) {
    await this.prisma.$transaction(async (tx) => {
      const component = await this.prisma.component.update({
        where: {
          id,
        },
        data: {
          isDelete: true,
        },
      });

      await tx.history.create({
        data: {
          description: '컴포넌트 삭제',
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: component.siteId,
            },
          },
          component: {
            connect: {
              id: component.id,
            },
          },
        },
      });
    });

    return true;
  }
}
