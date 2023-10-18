import { z } from 'zod'

export const sessionSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type SessionDto = z.infer<typeof sessionSchema>
