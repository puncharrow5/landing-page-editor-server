import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SiteService } from './site.service';
import {
  ComponentEntity,
  FooterEntity,
  HeaderEntity,
  MobileFooterEntity,
  MobileHeaderEntity,
  SiteEntity,
} from '@libs/entity';
import {
  ConnectSiteArgs,
  CreateSiteArgs,
  FindOneSiteByDomainArgs,
  FindOneSiteByIdArgs,
} from './dto';
import { ComponentService } from 'src/component/component.service';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard, AdminUpdateAccessGuard } from '@libs/guard';
import { AuthModel } from 'src/auth/auth.model';
import { CurrentAuth } from '@libs/decorator';
import { HeaderService } from 'src/header/header.service';
import { FooterService } from 'src/footer/footer.service';
import { DisconnectSiteArgs } from './dto/disconnect-site.args';

@Resolver(() => SiteEntity)
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly componentService: ComponentService,
    private readonly headerService: HeaderService,
    private readonly footerService: FooterService,
  ) {}

  @UseGuards(AdminAccessGuard)
  @Query(() => SiteEntity, { description: 'ID로 사이트 조회' })
  findOneSiteById(@Args() findOneSiteByIdArgs: FindOneSiteByIdArgs) {
    return this.siteService.findOneSiteById(findOneSiteByIdArgs);
  }

  @Query(() => SiteEntity, { description: '도메인으로 사이트 조회' })
  findOneSiteByDomain(
    @Args() findOneSiteByDomainArgs: FindOneSiteByDomainArgs,
  ) {
    return this.siteService.findOneSiteByDomain(findOneSiteByDomainArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Query(() => [SiteEntity], { description: '관리자 ID로 사이트 목록 조회' })
  findManySite(@CurrentAuth() auth: AuthModel) {
    const adminId = auth.id;

    return this.siteService.findManySite(adminId);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '사이트 생성' })
  createSite(
    @Args() createSiteArgs: CreateSiteArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.siteService.createSite(createSiteArgs, adminId);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '사이트 연결' })
  connectSite(
    @Args() connectSiteArgs: ConnectSiteArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.siteService.connectSite(connectSiteArgs, adminId);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '사이트 연결 해제' })
  disconnectSite(
    @Args() disconnectSIteArgs: DisconnectSiteArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.siteService.disconnectSite(disconnectSIteArgs, adminId);
  }

  @ResolveField('components', () => [ComponentEntity], {
    description: '컴포넌트 목록',
    nullable: true,
  })
  components(@Parent() site: SiteEntity) {
    const { id } = site;

    return this.componentService.findManyComponent(id);
  }

  @ResolveField('header', () => HeaderEntity, {
    description: '헤더',
    nullable: true,
  })
  header(@Parent() site: SiteEntity) {
    const { id } = site;

    return this.headerService.findHeader(id);
  }

  @ResolveField('mobileHeader', () => MobileHeaderEntity, {
    description: '모바일 헤더',
    nullable: true,
  })
  mobileHeader(@Parent() site: SiteEntity) {
    const { id } = site;

    return this.headerService.findMobileHeader(id);
  }

  @ResolveField('footer', () => FooterEntity, {
    description: '푸터',
    nullable: true,
  })
  footer(@Parent() site: SiteEntity) {
    const { id } = site;

    return this.footerService.findFooter(id);
  }

  @ResolveField('mobileFooter', () => MobileFooterEntity, {
    description: '모바일 푸터',
    nullable: true,
  })
  mobileFooter(@Parent() site: SiteEntity) {
    const { id } = site;

    return this.footerService.findMobileFooter(id);
  }
}
