import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Site } from '@prisma/client';

@ObjectType({ description: '사이트' })
export class SiteEntity implements Site {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '도메인' })
  domain: string;

  @Field({ description: '이름' })
  name: string;

  @Field({ description: '사이트 이메일' })
  email: string;
}
