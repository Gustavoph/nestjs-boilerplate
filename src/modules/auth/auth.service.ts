import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { SessionDto } from './dto/session.dto'

import { UsersRepository } from '@/shared/database/repositories/users.repository'
import { EnvService } from '@/shared/env/env.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly configService: EnvService,
  ) {}

  async createSession(sessionDto: SessionDto) {
    const { email, password } = sessionDto

    const user = await this.usersRepository.findUnique({ where: { email } })
    if (!user) throw new BadRequestException('User or password wrong.')

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) throw new BadRequestException('User or password wrong.')

    const payload = { sub: user.id }
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('AUTH_JWT_SECRET'),
      expiresIn: this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN'),
    })

    return { access_token: token }
  }
}
