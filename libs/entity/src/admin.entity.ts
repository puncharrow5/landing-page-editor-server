import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Admin } from '@prisma/client';

@ObjectType({ description: '관리자' })
export class AdminEntity implements Admin {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '이메일' })
  email: string;

  @Field({ description: '비밀번호' })
  password: string;

  @Field({ description: '이름' })
  name: string;

  @Field({ description: '이름', nullable: true })
  profileImage: string;

  @Field({ description: '리프레시 토큰', nullable: true })
  refreshToken: string | null;

  @Field(() => Int, { description: '관리자 권한 ID' })
  roleId: number;
}
