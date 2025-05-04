import { Field, PickType, ArgsType } from '@nestjs/graphql';
import { AdminEntity } from '@libs/entity';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class LoginWithEmailArgs extends PickType(AdminEntity, [
  'email',
  'password',
]) {
  @Field({ description: '이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  email: string;

  @Field({ description: '비밀번호' })
  @IsString({ message: '올바른 형식의 비밀번호를 입력해주세요.' })
  password: string;
}
