import { Field, PickType, ArgsType } from '@nestjs/graphql';
import { AdminEntity } from '@libs/entity';
import { IsEmail, IsString, Matches } from 'class-validator';
import { regexEmail, regexName, regexPassword } from 'libs/util/src';

@ArgsType()
export class CreateAdminArgs extends PickType(AdminEntity, [
  'email',
  'password',
  'name',
]) {
  @Field({ description: '이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  @Matches(regexEmail, {
    message: `올바른 형식의 이메일을 입력해주세요.`,
  })
  email: string;

  @Field({ description: '이름' })
  @IsString({ message: '올바른 형식의 이름을 입력해주세요.' })
  @Matches(regexName, {
    message: '이름은 한글, 영문, 숫자만 입력 가능합니다.',
  })
  name: string;

  @Field({ description: '비밀번호' })
  @IsString({ message: '올바른 형식의 비밀번호를 입력해주세요.' })
  @Matches(regexPassword, {
    message: '비밀번호는 한글, 영문, 특수문자 포함 8~20자로 입력해주세요.',
  })
  password: string;

  @Field({ description: '비밀번호 확인' })
  @IsString({ message: '올바른 형식의 비밀번호를 입력해주세요.' })
  confirmPassword: string;
}
