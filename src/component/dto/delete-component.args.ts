import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { ComponentEntity } from '@libs/entity';
import { IsInt } from 'class-validator';

@ArgsType()
export class DeleteComponentArgs extends PickType(ComponentEntity, ['id']) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  id: number;
}
