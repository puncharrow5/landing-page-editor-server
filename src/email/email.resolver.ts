import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { SendEmailArgs } from './dto';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean, { description: '이메일 발송' })
  async SendEmail(@Args() sendEmailArgs: SendEmailArgs) {
    return await this.emailService.sendEmail(sendEmailArgs);
  }
}
