import { Field, PickType, ArgsType } from '@nestjs/graphql';
import { AdminEntity } from '@libs/entity';
import { IsEmail, Matches } from 'class-validator';
import { regexEmail } from 'libs/util/src';

@ArgsType()
export class SendVerifyCodeArgs extends PickType(AdminEntity, ['email']) {
  @Field({ description: '이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  @Matches(regexEmail, {
    message: `올바른 형식의 이메일을 입력해주세요.`,
  })
  email: string;
}
