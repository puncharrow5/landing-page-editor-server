import { Field, PickType, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { SiteEntity } from '@libs/entity';

@ArgsType()
export class CreateSiteArgs extends PickType(SiteEntity, [
  'domain',
  'name',
  'email',
]) {
  @Field({ description: '도메인' })
  @IsString({ message: '올바른 형식의 도메인을 입력해주세요.' })
  domain: string;

  @Field({ description: '이름' })
  @IsString({ message: '올바른 형식의 이름을 입력해주세요.' })
  name: string;

  @Field({ description: '이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  email: string;
}
