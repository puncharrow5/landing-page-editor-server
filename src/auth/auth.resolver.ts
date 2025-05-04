import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SendVerifyCodeArgs, VerifyEmailArgs } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean, { description: '인증코드 발송' })
  async sendVerifyCode(@Args() sendVerifyCodeArgs: SendVerifyCodeArgs) {
    return await this.authService.sendVerifyCode(sendVerifyCodeArgs);
  }

  @Mutation(() => Boolean, { description: '이메일 인증' })
  async verifyEmail(@Args() verifyEmailArgs: VerifyEmailArgs) {
    return await this.authService.verifyEmail(verifyEmailArgs);
  }
}
