import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BackgroundType, ChildStyle } from '@prisma/client';

@ObjectType({ description: '자식 컴포넌트 스타일' })
export class ChildStyleEntity implements ChildStyle {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '너비', nullable: true })
  width: string | null;

  @Field({ description: '높이', nullable: true })
  height: string | null;

  @Field({ description: '마진', nullable: true })
  margin: string | null;

  @Field({ description: '패딩', nullable: true })
  padding: string | null;

  @Field({ description: '배경', nullable: true })
  background: string | null;

  @Field(() => BackgroundType, { description: '배경 종류', nullable: true })
  backgroundType: BackgroundType | null;

  @Field({ description: '테두리', nullable: true })
  border: string | null;

  @Field({ description: '테두리 곡률', nullable: true })
  borderRadius: string | null;

  // 제목
  @Field({ description: '제목 크기', nullable: true })
  titleSize: string | null;

  @Field({ description: '제목 색상', nullable: true })
  titleColor: string | null;

  @Field(() => Float, { description: '제목 줄 높이', nullable: true })
  titleLineHeight: number | null;

  @Field({ description: '제목 마진', nullable: true })
  titleMargin: string | null;

  // 내용
  @Field({ description: '내용 크기', nullable: true })
  contentSize: string | null;

  @Field({ description: '내용 색상', nullable: true })
  contentColor: string | null;

  @Field(() => Float, { description: '내용 줄 높이', nullable: true })
  contentLineHeight: number | null;

  @Field({ description: '내용 마진', nullable: true })
  contentMargin: string | null;

  @Field(() => Int, { description: '자식컴포넌트 ID' })
  childId: number;
}
