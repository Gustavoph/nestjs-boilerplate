import { Module } from '@nestjs/common'

import { MailerService } from './mailer.service'

import { EnvService } from '@/shared/env/env.service'

@Module({
  providers: [MailerService, EnvService],
  exports: [MailerService],
})
export class MailerModule {}
