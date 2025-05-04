import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateMobileChildArgs,
  DeleteMobileChildArgs,
  UpdateMobileChildArgs,
} from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';
import { MobileChildEntity, MobileChildStyleEntity } from '@libs/entity';
import { StyleService } from 'src/style/style.service';
import { MobileChildService } from './mobile-child.service';
import { CurrentAuth } from '@libs/decorator';
import { AuthModel } from 'src/auth/auth.model';

@Resolver(() => MobileChildEntity)
export class MobileChildResolver {
  constructor(
    private readonly mobileChildService: MobileChildService,
    private readonly styleService: StyleService,
  ) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '모바일 자식 컴포넌트 생성' })
  createMobileChild(
    @Args() createMobileChildArgs: CreateMobileChildArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.mobileChildService.createMobileChild(
      createMobileChildArgs,
      adminId,
    );
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '모바일 자식 컴포넌트 업데이트' })
  updateMobileChild(
    @Args() updateMobileChildArgs: UpdateMobileChildArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.mobileChildService.updateMobileChild(
      updateMobileChildArgs,
      adminId,
    );
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '모바일 자식 컴포넌트 삭제' })
  deleteMobileChild(
    @Args() deleteMobileChildArgs: DeleteMobileChildArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.mobileChildService.deleteMobileChild(
      deleteMobileChildArgs,
      adminId,
    );
  }

  @ResolveField('mobileChildStyle', () => MobileChildStyleEntity, {
    description: '모바일 자식 컴포넌트 스타일',
    nullable: true,
  })
  mobileChildStyle(@Parent() mobileChild: MobileChildEntity) {
    const { id } = mobileChild;

    return this.styleService.findMobileChildStyle(id);
  }
}
