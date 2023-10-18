import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { DatabaseModule } from '@/shared/database/database.module'
import { MailModule } from '@/shared/mail/mail.module'

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
