import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as nodemailer from 'nodemailer';
import { SendEmailArgs } from './dto';

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
}
