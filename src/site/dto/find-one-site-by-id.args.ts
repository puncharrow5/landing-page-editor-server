import { ArgsType, Int, Field, PickType } from '@nestjs/graphql';
import { SiteEntity } from '@libs/entity';
import { IsInt } from 'class-validator';

@ArgsType()
export class FindOneSiteByIdArgs extends PickType(SiteEntity, ['id']) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 ID를 입력해주세요.' })
  id: number;
}
