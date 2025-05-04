import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HeaderService } from './header.service';
import { UpdateHeaderArgs, UpdateMobileHeaderArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';
import { CurrentAuth } from '@libs/decorator';
import { AuthModel } from 'src/auth/auth.model';

@Resolver()
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '헤더 수정' })
  updateHeader(
    @Args() updateHeaderArgs: UpdateHeaderArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.headerService.updateHeader(updateHeaderArgs, adminId);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '모바일 헤더 수정' })
  updateMobileHeader(
    @Args() updateMobileHeaderArgs: UpdateMobileHeaderArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.headerService.updateMobileHeader(
      updateMobileHeaderArgs,
      adminId,
    );
  }
}
