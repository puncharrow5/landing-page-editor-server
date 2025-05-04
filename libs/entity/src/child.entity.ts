import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Child } from '@prisma/client';

@ObjectType({ description: '자식 컴포넌트' })
export class ChildEntity implements Child {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '제목', nullable: true })
  title: string | null;

  @Field({ description: '내용', nullable: true })
  content: string | null;

  @Field({ description: '삭제 여부' })
  isDelete: boolean;

  @Field(() => Int, { description: '컴포넌트 ID' })
  componentId: number;
}
