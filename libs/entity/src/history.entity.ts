import { Field, Int, ObjectType } from '@nestjs/graphql';
import { History } from '@prisma/client';

@ObjectType({ description: '활동 내역' })
export class HistoryEntity implements History {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '내용' })
  description: string;

  @Field({ description: '시간' })
  createdAt: Date;

  @Field({ description: '관리자 ID' })
  adminId: number;

  @Field({ description: '사이트 ID' })
  siteId: number;

  @Field({ description: '컴포넌트 ID', nullable: true })
  componentId: number | null;

  @Field({ description: '자식컴포넌트 ID', nullable: true })
  childId: number | null;

  @Field({ description: '모바일 자식컴포넌트 ID', nullable: true })
  mobileChildId: number | null;
}
