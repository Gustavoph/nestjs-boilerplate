import * as crypto from 'node:crypto'

import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto'

import { UsersRepository } from '@/shared/database/repositories/users.repository'
import { MailService } from '@/shared/mail/mail.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto

    const hash = crypto.createHash('sha256').digest('hex')
    const passwordHash = await bcrypt.hash(password, 8)

    const { id } = await this.usersRepository.create({
      data: { email, name, password: passwordHash, hash },
    })

    if (id) {
      await this.mailService.emailConfirmation({
        data: { hash },
        to: email,
      })
    }
  }
}
