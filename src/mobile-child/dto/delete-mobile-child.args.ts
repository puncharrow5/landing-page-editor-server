import { MobileChildEntity } from '@libs/entity';
import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class DeleteMobileChildArgs extends PickType(MobileChildEntity, ['id']) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 ID를 입력해주세요.' })
  id: number;
}
