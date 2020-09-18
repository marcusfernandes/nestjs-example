import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';
import * as hbs from 'nodemailer-express-handlebars';
import { resolve } from 'dns';

interface Mail {
  from: string, 
  to:string, 
  subject:string
}

@Injectable()
export class MailService {

  constructor(private config: ConfigService){

  }

  private viewEngine = {
    extname: '.hbs', // handlebars extension
    layoutsDir: 'views/email/', // location of handlebars templates
    defaultLayout: 'template', // name of main template
    partialsDir: 'views/email/', // location of your subtemplates aka. header, footer etc
  }

  private transporter = nodemailer.createTransport({
    host: this.config.get<string>('MAIL_HOST'),
    port: this.config.get<number>('MAIL_PORTMAIL_PORTMAIL_PORT'),
    auth: {
      user: this.config.get<string>('MAIL_USER'),
      pass: this.config.get<string>('MAIL_PASS'),
    }
  })  

  async sendEmail(input: Mail): Promise<any>{
    await this.transporter.sendMail({
      from: input.from,
      to: input.to,
      subject: input.subject,
      text:'Teste',
      html:'<h1>teste</h1>'
    })
  }

}
