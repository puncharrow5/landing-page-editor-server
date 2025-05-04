import { Field, PickType, ArgsType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { SiteEntity } from '@libs/entity';

@ArgsType()
export class ConnectSiteArgs extends PickType(SiteEntity, ['domain']) {
  @Field({ description: '도메인' })
  @IsString({ message: '올바른 형식의 도메인을 입력해주세요.' })
  domain: string;
}
