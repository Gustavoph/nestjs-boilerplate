import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvModule } from '../env/env.module'

import { MailService } from './mail.service'

import { MailerModule } from '@/shared/mailer/mailer.module'

@Module({
  imports: [ConfigModule, MailerModule, EnvModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
