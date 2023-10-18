import { z } from 'zod'

export const createUserDto = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type CreateUserDto = z.infer<typeof createUserDto>
