import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { ComponentEntity } from '@libs/entity';
import { IsInt } from 'class-validator';

@InputType()
export class FindManyComponentArgs extends PickType(ComponentEntity, [
  'siteId',
]) {
  @Field(() => Int, { description: '사이트 ID' })
  @IsInt({ message: '올바른 형식의 사이트 ID를 입력해주세요.' })
  siteId: number;
}
