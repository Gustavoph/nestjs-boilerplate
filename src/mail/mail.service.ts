import * as path from 'node:path'

import { Injectable } from '@nestjs/common'

import { MailData } from './interfaces/mail-data.interface'

import { EnvService } from '@/env/env.service'
import { MailerService } from '@/mailer/mailer.service'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: EnvService,
  ) {}

  async emailConfirmation(mailData: MailData<{ hash: string }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Confirmation Email',
      templatePath: path.join(
        process.cwd(),
        'src',
        'mail',
        'mail-template',
        'email-confirmation.hbs',
      ),
      context: {},
    })
  }
}
