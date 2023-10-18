import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { MailerModule } from './mailer/mailer.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
      envFilePath: ['.env'],
    }),
    EnvModule,
    MailerModule,
  ],
})
export class AppModule {}
