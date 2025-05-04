import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';
import { CurrentAuth } from '@libs/decorator';
import { AuthModel } from 'src/auth/auth.model';
import { HistoryEntity, SiteEntity } from '@libs/entity';
import { FindManyHistoryArgs } from './dto';
import { SiteService } from 'src/site/site.service';

@Resolver(() => HistoryEntity)
export class HistoryResolver {
  constructor(
    private readonly historyService: HistoryService,
    private readonly siteService: SiteService,
  ) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Query(() => [HistoryEntity], { description: '수정내역 목록 조회' })
  findManyHistory(
    @Args() findManyHistoryArgs: FindManyHistoryArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.historyService.findManyHistory(findManyHistoryArgs, adminId);
  }

  @ResolveField('site', () => SiteEntity, {
    description: '사이트',
    nullable: true,
  })
  site(@Parent() history: HistoryEntity) {
    const { siteId } = history;

    return this.siteService.findOneSite(siteId);
  }
}
