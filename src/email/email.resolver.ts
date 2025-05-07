import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { SendInquiryEmailArgs } from './dto';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean, { description: '문의 이메일 발송' })
  async SendInquiryEmail(@Args() sendInquiryEmailArgs: SendInquiryEmailArgs) {
    return await this.emailService.sendInquiryEmail(sendInquiryEmailArgs);
  }
}
