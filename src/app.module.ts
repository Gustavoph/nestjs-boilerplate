import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DatabaseModule } from './shared/database/database.module'
import { envSchema } from './shared/env/env'
import { EnvModule } from './shared/env/env.module'
import { MailerModule } from './shared/mailer/mailer.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
      envFilePath: ['.env'],
    }),
    EnvModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    MailerModule,
  ],
})
export class AppModule {}
