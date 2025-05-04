import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Header } from '@prisma/client';

@ObjectType({ description: '헤더' })
export class HeaderEntity implements Header {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '로고', nullable: true })
  logo: string | null;

  @Field({ description: '로고 사이즈', nullable: true })
  logoSize: string | null;

  @Field({ description: '헤더 높이', nullable: true })
  height: string | null;

  @Field({ description: '패딩', nullable: true })
  padding: string | null;

  @Field({ description: '갭', nullable: true })
  gap: string | null;

  @Field({ description: '배경 색상', nullable: true })
  backgroundColor: string | null;

  @Field({ description: '텍스트 크기', nullable: true })
  textSize: string | null;

  @Field({ description: '텍스트 색상', nullable: true })
  textColor: string | null;

  @Field(() => Int, { description: '사이트 ID' })
  siteId: number;
}
