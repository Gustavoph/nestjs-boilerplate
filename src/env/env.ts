import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  APP_PORT: z.coerce.number().default(3333),
  API_PREFIX: z.string(),
})

export type Env = z.infer<typeof envSchema>
