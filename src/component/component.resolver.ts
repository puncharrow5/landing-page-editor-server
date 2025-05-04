import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ComponentService } from './component.service';
import {
  ChildEntity,
  ComponentEntity,
  ComponentMobileStyleEntity,
  ComponentStyleEntity,
  ContentStyleEntity,
  InquiryStyleEntity,
  MobileChildEntity,
  MobileInquiryStyleEntity,
  TitleStyleEntity,
} from '@libs/entity';
import {
  CreateComponentArgs,
  DeleteComponentArgs,
  UpdateComponentArgs,
} from './dto';
import { StyleService } from 'src/style/style.service';
import { ChildService } from 'src/child/child.service';
import { MobileChildService } from 'src/mobile-child/mobile-child.service';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';
import { CurrentAuth } from '@libs/decorator';
import { AuthModel } from 'src/auth/auth.model';

@Resolver(() => ComponentEntity)
export class ComponentResolver {
  constructor(
    private readonly componentService: ComponentService,
    private readonly styleService: StyleService,
    private readonly childService: ChildService,
    private readonly mobileChildService: MobileChildService,
  ) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 생성' })
  createComponent(
    @Args() createComponentArgs: CreateComponentArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.componentService.createComponent(createComponentArgs, adminId);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 수정' })
  updateComponent(
    @Args() updateComponentArgs: UpdateComponentArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.componentService.updateComponent(updateComponentArgs, adminId);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 삭제' })
  deleteComponent(
    @Args() deleteComponentArgs: DeleteComponentArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.componentService.deleteComponent(deleteComponentArgs, adminId);
  }

  @ResolveField('titleStyle', () => TitleStyleEntity, {
    description: '제목 스타일',
    nullable: true,
  })
  titleStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findTitleStyle(id);
  }

  @ResolveField('componentStyle', () => ComponentStyleEntity, {
    description: '컴포넌트 스타일',
    nullable: true,
  })
  componentStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findComponentStyle(id);
  }

  @ResolveField('componentMobileStyle', () => ComponentMobileStyleEntity, {
    description: '컴포넌트 모바일 스타일',
    nullable: true,
  })
  componentMobileStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findComponentMobileStyle(id);
  }

  @ResolveField('contentStyle', () => ContentStyleEntity, {
    description: '내용 스타일',
    nullable: true,
  })
  contentStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findContentStyle(id);
  }

  @ResolveField('inquiryStyle', () => InquiryStyleEntity, {
    description: '문의 스타일',
    nullable: true,
  })
  inquiryStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findInquiryStyle(id);
  }

  @ResolveField('mobileInquiryStyle', () => MobileInquiryStyleEntity, {
    description: '모바일 문의 스타일',
    nullable: true,
  })
  mobileInquiryStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findMobileInquiryStyle(id);
  }

  @ResolveField('children', () => [ChildEntity], {
    description: '자식 컴포넌트 목록',
    nullable: true,
  })
  children(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.childService.findManyChild(id);
  }

  @ResolveField('mobileChildren', () => [MobileChildEntity], {
    description: '모바일 자식 컴포넌트 목록',
    nullable: true,
  })
  mobileChildren(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.mobileChildService.findManyMobileChild(id);
  }
}
