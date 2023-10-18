import fs from 'node:fs/promises'

import { Injectable } from '@nestjs/common'
import Handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'
import { EnvService } from 'src/env/env.service'

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter

  constructor(private readonly config: EnvService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAIL_HOST'),
      port: this.config.get('MAIL_PORT'),
      ignoreTLS: this.config.get('MAIL_IGNORE_TLS'),
      secure: this.config.get('MAIL_SECURE'),
      requireTLS: this.config.get('MAIL_REQUIRE_TLS'),
      auth: {
        user: this.config.get('MAIL_USER'),
        pass: this.config.get('MAIL_PASSWORD'),
      },
    })
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string
    context: Record<string, unknown>
  }) {
    let html: string | undefined

    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8')
      html = Handlebars.compile(template, {
        strict: true,
      })(context)
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${this.config.get('MAIL_DEFAULT_NAME')}" <${this.config.get(
            'MAIL_DEFAULT_EMAIL',
          )}>`,
      html: mailOptions.html ? mailOptions.html : html,
    })
  }
}
