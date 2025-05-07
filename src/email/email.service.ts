import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as nodemailer from 'nodemailer';
import { SendEmailArgs, SendInquiryEmailArgs } from './dto';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter;

  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // 이메일 발송
  async sendEmail({ from, to, subject, html }: SendEmailArgs) {
    const emailOptions: EmailOptions = {
      from,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(emailOptions);

    return true;
  }

  // 문의 이메일 발송
  async sendInquiryEmail({
    id,
    userEmail,
    phoneNumber,
    content,
  }: SendInquiryEmailArgs) {
    const site = await this.prisma.site.findFirst({
      where: {
        id,
      },
    });

    if (!site) {
      throw new BadRequestException('존재하지 않는 사이트입니다.');
    }

    const emailOptions: EmailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: `${site.name} 문의 메일`,
      html: `<p><div>문의자 이메일 : ${userEmail}</div><div>문의 내용 : ${content}</div><div>연락처 : ${phoneNumber}</div></p>`,
    };

    await this.sendEmail(emailOptions);

    return true;
  }
}
