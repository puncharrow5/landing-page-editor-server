import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { MobileInquiryStyle } from '@prisma/client';

@ObjectType({ description: '모바일문의 스타일' })
export class MobileInquiryStyleEntity implements MobileInquiryStyle {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '패딩', nullable: true })
  padding: string | null;

  @Field({ description: '갭', nullable: true })
  gap: string | null;

  @Field({ description: '텍스트 크기', nullable: true })
  textSize: string | null;

  @Field({ description: '텍스트 색상', nullable: true })
  textColor: string | null;

  @Field(() => Float, { description: '줄 높이', nullable: true })
  lineHeight: number;

  @Field({ description: '배경 색상', nullable: true })
  backgroundColor: string | null;

  // 버튼
  @Field({ description: '버튼 너비', nullable: true })
  buttonWidth: string | null;

  @Field({ description: '버튼 높이', nullable: true })
  buttonHeight: string | null;

  @Field({ description: '버튼 텍스트 크기', nullable: true })
  buttonTextSize: string | null;

  @Field({ description: '버튼 텍스트 색상', nullable: true })
  buttonTextColor: string | null;

  @Field({ description: '버튼 텍스트 색상', nullable: true })
  buttonColor: string | null;

  @Field({ description: '버튼 텍스트 색상', nullable: true })
  buttonRadius: string | null;

  @Field(() => Int, { description: '컴포넌트 ID' })
  componentId: number;
}
