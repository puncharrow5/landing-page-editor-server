import { MobileChildEntity } from '@libs/entity';
import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class CreateMobileChildArgs extends PickType(MobileChildEntity, [
  'componentId',
]) {
  @Field(() => Int, { description: '컴포넌트 ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  componentId: number;
}
