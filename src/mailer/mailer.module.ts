import { Module } from '@nestjs/common'
import { EnvService } from 'src/env/env.service'

import { MailerService } from './mailer.service'

@Module({
  providers: [MailerService, EnvService],
  exports: [MailerService],
})
export class MailerModule {}
