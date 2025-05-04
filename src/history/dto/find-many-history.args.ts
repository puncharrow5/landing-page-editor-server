import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class FindManyHistoryArgs {
  @Field(() => Int, { description: 'skip' })
  @IsInt({ message: 'skip의 형식이 잘못됐습니다.' })
  skip: number;

  @Field(() => Int, { description: 'take' })
  @IsInt({ message: '의 형식이 잘못됐습니다.' })
  take: number;
}
