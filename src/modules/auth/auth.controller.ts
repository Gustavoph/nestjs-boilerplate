import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SessionDto, sessionSchema } from './dto/session.dto'
import { Public } from './public'

import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sessions')
  @Public()
  @HttpCode(HttpStatus.OK)
  async session(@Body(new ZodValidationPipe(sessionSchema)) body: SessionDto) {
    return this.authService.createSession(body)
  }
}
