import { Body, Controller, Post } from '@nestjs/common'

import { createUserDto, CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe'

const createUserBodyValidation = new ZodValidationPipe(createUserDto)

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(createUserBodyValidation) body: CreateUserDto) {
    return this.usersService.create(body)
  }
}
