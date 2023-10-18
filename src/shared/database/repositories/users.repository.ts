import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUnique(filter: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(filter)
  }

  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto)
  }
}
