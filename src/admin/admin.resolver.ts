import {
  Resolver,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { AdminEntity, RoleEntity } from '@libs/entity';
import {
  CreateAdminArgs,
  LoginWithEmailArgs,
  UpdateProfileImageArgs,
} from './dto';
import { RoleService } from 'src/role/role.service';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard, AdminUpdateAccessGuard } from '@libs/guard';
import { AuthModel } from 'src/auth/auth.model';
import { CurrentAuth } from '@libs/decorator';
import { Request } from 'express';

@Resolver(() => AdminEntity)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly roleService: RoleService,
  ) {}
  @UseGuards(AdminAccessGuard)
  @Query(() => AdminEntity, { description: '관리자 정보' })
  findAdmin(@CurrentAuth() auth: AuthModel) {
    const adminId = auth.id;

    return this.adminService.findAdmin(adminId);
  }

  @Mutation(() => Boolean, { description: '회원가입' })
  createAdmin(@Args() createAdminArgs: CreateAdminArgs) {
    return this.adminService.createAdmin(createAdminArgs);
  }

  @Mutation(() => Boolean, { description: '로그인' })
  async login(
    @Args() loginWithEmailArgs: LoginWithEmailArgs,
    @Context() { res },
  ) {
    return await this.adminService.loginWithEmail(loginWithEmailArgs, res);
  }

  @Mutation(() => Boolean, { description: '로그아웃' })
  async logout(@Context() { res }) {
    return await this.adminService.logout(res);
  }

  @Mutation(() => Boolean, { description: 'AccessToken 재발급' })
  async getNewAccessToken(@Context('req') req: Request, @Context() { res }) {
    const refreshToken = req.cookies.refreshToken;

    return await this.adminService.getNewAccessToken(res, refreshToken);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => String, { description: '이미지 업로드' })
  updateProfileImage(
    @CurrentAuth() auth: AuthModel,
    @Args() updateProfileImageArgs: UpdateProfileImageArgs,
  ) {
    const adminId = auth.id;

    return this.adminService.updateProfileImage(
      adminId,
      updateProfileImageArgs,
    );
  }

  @ResolveField(() => String, { description: '비밀번호', nullable: true })
  password(@Parent() admin: AdminEntity) {
    const { password } = admin;

    return '********';
  }

  @ResolveField('role', () => RoleEntity, {
    description: '관리자 권한',
    nullable: true,
  })
  role(@Parent() admin: AdminEntity) {
    const { roleId } = admin;

    return this.roleService.findAdminRole(roleId);
  }
}
