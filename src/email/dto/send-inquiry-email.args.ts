import { SiteEntity } from '@libs/entity';
import { Field, ArgsType, PickType, Int } from '@nestjs/graphql';
import { IsEmail, IsInt, IsString, Matches, Min } from 'class-validator';
import { regexEmail, regexPhoneNumber } from 'libs/util/src';

@ArgsType()
export class SendInquiryEmailArgs extends PickType(SiteEntity, ['id']) {
  @Field(() => Int, { description: '랜딩페이지 ID' })
  @IsInt({ message: '올바른 형식의 랜딩페이지 ID를 입력해주세요.' })
  id: number;

  @Field({ description: '문의자 이메일' })
  @IsEmail({}, { message: '올바른 형식의 문의자 이메일을 입력해주세요.' })
  @Matches(regexEmail, {
    message: `올바른 형식의 문의자 이메일을 입력해주세요.`,
  })
  userEmail: string;

  @Field({ description: '전화번호' })
  @IsString({ message: '올바른 형식의 전화번호를 입력해주세요.' })
  @Matches(regexPhoneNumber, {
    message: `올바른 형식의 전화번호를 입력해주세요.`,
  })
  phoneNumber: string;

  @Field({ description: '내용' })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @Min(10, { message: '내용은 10자 이상 입력해주세요.' })
  content: string;
}
