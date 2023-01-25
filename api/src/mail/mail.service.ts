import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private _mailerService: MailerService) { }

  async sendEmail(template, to, subject, viewData) {
    try {
      let email = await this._mailerService.sendMail({
        to: to,
        subject: subject,
        template: `./${template}`,
        context: viewData,
      });

      console.log('email: ', email);
      return email
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong'}      
    }
  }
}