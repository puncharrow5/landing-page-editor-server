import { Field, PickType, ArgsType } from '@nestjs/graphql';
import { AdminEntity } from '@libs/entity';
import { IsEmail, IsString, Matches } from 'class-validator';
import { regexEmail } from 'libs/util/src';

@ArgsType()
export class VerifyEmailArgs extends PickType(AdminEntity, ['email']) {
  @Field({ description: '이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  @Matches(regexEmail, {
    message: `올바른 형식의 이메일을 입력해주세요.`,
  })
  email: string;

  @Field({ description: '인증 코드' })
  @IsString({ message: '올바른 형식의 인증 코드를 입력해주세요.' })
  verifyCode: string;
}
