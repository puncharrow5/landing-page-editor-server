import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class StyleService {
  constructor(private prisma: PrismaService) {}

  // 컴포넌트 스타일 조회
  findComponentStyle(componentId: number) {
    return this.prisma.componentStyle.findUnique({
      where: { componentId },
    });
  }

  // 컴포넌트 모바일 스타일 조회
  findComponentMobileStyle(componentId: number) {
    return this.prisma.componentMobileStyle.findUnique({
      where: { componentId },
    });
  }

  // 제목 스타일 조회
  findTitleStyle(componentId: number) {
    return this.prisma.titleStyle.findUnique({
      where: { componentId },
    });
  }

  // 내용 스타일 조회
  findContentStyle(componentId: number) {
    return this.prisma.contentStyle.findUnique({
      where: { componentId },
    });
  }

  // 문의 스타일 조회
  findInquiryStyle(componentId: number) {
    return this.prisma.inquiryStyle.findUnique({
      where: { componentId },
    });
  }

  // 모바일 문의 스타일 조회
  findMobileInquiryStyle(componentId: number) {
    return this.prisma.mobileInquiryStyle.findUnique({
      where: { componentId },
    });
  }

  // 자식 컴포넌트 스타일 조회
  findChildStyle(childId: number) {
    return this.prisma.childStyle.findUnique({
      where: { childId },
    });
  }

  // 모바일 자식 컴포넌트 스타일 조회
  findMobileChildStyle(mobileChildId: number) {
    return this.prisma.mobileChildStyle.findUnique({
      where: { mobileChildId },
    });
  }
}
