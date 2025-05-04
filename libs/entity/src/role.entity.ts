import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType({ description: '관리자 권한' })
export class RoleEntity implements Role {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '이름' })
  name: string;

  @Field({ description: '설명' })
  description: string;
}
