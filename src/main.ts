import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app.module'
import { EnvService } from '@/shared/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const configService = app.get(EnvService)

  const APP_PORT = configService.get('APP_PORT')
  const API_PREFIX = configService.get('API_PREFIX')

  app.setGlobalPrefix(API_PREFIX)
  await app.listen(APP_PORT)
}
bootstrap()
