import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { EnvService } from '@/shared/env/env.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('AUTH_JWT_SECRET'),
    })
  }

  public validate(payload: { sub: string }) {
    if (!payload.sub) throw new UnauthorizedException()
    return payload
  }
}
