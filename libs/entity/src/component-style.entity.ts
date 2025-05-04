import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BackgroundType, ComponentStyle } from '@prisma/client';

@ObjectType({ description: '컴포넌트 스타일' })
export class ComponentStyleEntity implements ComponentStyle {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '높이', nullable: true })
  height: string | null;

  @Field({ description: '패딩', nullable: true })
  padding: string | null;

  @Field(() => Int, { description: 'ID', nullable: true })
  grid: number | null;

  @Field({ description: '갭', nullable: true })
  gap: string | null;

  @Field({ description: '배경', nullable: true })
  background: string | null;

  @Field(() => BackgroundType, { description: '배경 종류', nullable: true })
  backgroundType: BackgroundType | null;

  @Field(() => Int, { description: '컴포넌트 ID' })
  componentId: number;
}
