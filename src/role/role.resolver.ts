import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { UseGuards } from '@nestjs/common';
import { AdminMasterAccessGuard } from '@libs/guard';
import { UpdateAdminRoleArgs } from './dto';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AdminMasterAccessGuard)
  @Mutation(() => Boolean, { description: '유저 권한 수정' })
  updateAdminRole(@Args() updateAdminRoleArgs: UpdateAdminRoleArgs) {
    return this.roleService.updateAdminRole(updateAdminRoleArgs);
  }
}
