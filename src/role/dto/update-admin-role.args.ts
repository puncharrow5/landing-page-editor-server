import {
  Int,
  Field,
  PickType,
  ArgsType,
  IntersectionType,
} from '@nestjs/graphql';
import { AdminEntity, RoleEntity } from '@libs/entity';
import { IsInt } from 'class-validator';

@ArgsType()
class AdminIdArgs extends PickType(AdminEntity, ['id']) {
  @Field(() => Int, { description: '어드민 ID' })
  @IsInt({ message: '올바른 형식의 어드민 ID를 입력해주세요.' })
  adminId: number;
}

@ArgsType()
class RoleIdArgs extends PickType(RoleEntity, ['id']) {
  @Field(() => Int, { description: '권한 ID' })
  @IsInt({ message: '올바른 형식의 권한 ID를 입력해주세요.' })
  roleId: number;
}

@ArgsType()
export class UpdateAdminRoleArgs extends IntersectionType(
  AdminIdArgs,
  RoleIdArgs,
) {}
