import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FindManyHistoryArgs } from './dto';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  // 수정내역 목록 조회
  async findManyHistory({ skip, take }: FindManyHistoryArgs, adminId: number) {
    return await this.prisma.history.findMany({
      where: {
        adminId,
      },
      include: {
        site: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  }
}
