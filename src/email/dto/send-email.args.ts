import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, Min } from 'class-validator';
import { regexEmail } from 'libs/util/src';

@ArgsType()
export class SendEmailArgs {
  @Field({ description: '보내는 이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  @Matches(regexEmail, {
    message: `올바른 형식의 이메일을 입력해주세요.`,
  })
  from: string;

  @Field({ description: '받는 이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  @Matches(regexEmail, {
    message: `올바른 형식의 이메일을 입력해주세요.`,
  })
  to: string;

  @Field({ description: '제목' })
  @IsString({ message: '올바른 형식의 제목을 입력해주세요.' })
  subject: string;

  @Field({ description: '내용' })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @Min(10, { message: '내용은 10자 이상 입력해주세요.' })
  html: string;
}
