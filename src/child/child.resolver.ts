import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChildService } from './child.service';
import { CreateChildArgs, DeleteChildArgs, UpdateChildArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';
import { ChildEntity, ChildStyleEntity } from '@libs/entity';
import { StyleService } from 'src/style/style.service';
import { CurrentAuth } from '@libs/decorator';
import { AuthModel } from 'src/auth/auth.model';

@Resolver(() => ChildEntity)
export class ChildResolver {
  constructor(
    private readonly childService: ChildService,
    private readonly styleService: StyleService,
  ) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 생성' })
  createChild(
    @Args() createComponentArgs: CreateChildArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.childService.createChild(createComponentArgs, adminId);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 업데이트' })
  updateChild(
    @Args() updateChildArgs: UpdateChildArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.childService.updateChild(updateChildArgs, adminId);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 삭제' })
  deleteChild(
    @Args() deleteChildArgs: DeleteChildArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.childService.deleteChild(deleteChildArgs, adminId);
  }

  @ResolveField('childStyle', () => ChildStyleEntity, {
    description: '자식 컴포넌트 스타일',
    nullable: true,
  })
  childStyle(@Parent() child: ChildEntity) {
    const { id } = child;

    return this.styleService.findChildStyle(id);
  }
}
