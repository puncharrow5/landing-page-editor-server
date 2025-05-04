import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Footer } from '@prisma/client';

@ObjectType({ description: '푸터' })
export class FooterEntity implements Footer {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => Int, { description: '푸터 타입' })
  footerType: number;

  @Field({ description: '로고', nullable: true })
  logo: string | null;

  @Field({ description: '로고 사이즈', nullable: true })
  logoSize: string | null;

  @Field({ description: '상단 내용', nullable: true })
  contentTop: string | null;

  @Field({ description: '고객센터', nullable: true })
  helpCenter: string | null;

  @Field({ description: '약관', nullable: true })
  terms: string | null;

  @Field({ description: '하단 내용', nullable: true })
  contentBottom: string | null;

  @Field({ description: '배경 색상', nullable: true })
  backgroundColor: string | null;

  @Field({ description: '상단 패딩', nullable: true })
  paddingTop: string | null;

  @Field({ description: '하단 패딩', nullable: true })
  paddingBottom: string | null;

  @Field({ description: '텍스트 크기', nullable: true })
  textSize: string | null;

  @Field({ description: '텍스트 색상', nullable: true })
  textColor: string | null;

  @Field(() => Float, { description: '줄 높이', nullable: true })
  lineHeight: number | null;

  @Field(() => Int, { description: '사이트 ID' })
  siteId: number;
}
