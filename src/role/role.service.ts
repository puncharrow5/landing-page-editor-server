import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateAdminRoleArgs } from './dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  // 관리자 권한 조회
  findAdminRole(roleId: number) {
    return this.prisma.role.findUnique({
      where: { id: roleId },
    });
  }

  // 관리자 권한 수정
  updateAdminRole({ adminId, roleId }: UpdateAdminRoleArgs) {
    return this.prisma.admin.update({
      where: { id: adminId },
      data: { roleId },
    });
  }
}
