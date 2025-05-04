import { FooterService } from './footer.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UpdateFooterArgs, UpdateMobileFooterArgs } from './dto';
import { AdminUpdateAccessGuard } from '@libs/guard';
import { CurrentAuth } from '@libs/decorator';
import { AuthModel } from 'src/auth/auth.model';

@Resolver()
export class FooterResolver {
  constructor(private readonly footerService: FooterService) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '푸터 수정' })
  updateFooter(
    @Args() updateFooterArgs: UpdateFooterArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.footerService.updateFooter(updateFooterArgs, adminId);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '모바일 푸터 수정' })
  updateMobileFooter(
    @Args() updateMobileFooterArgs: UpdateMobileFooterArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.footerService.updateMobileFooter(
      updateMobileFooterArgs,
      adminId,
    );
  }
}
