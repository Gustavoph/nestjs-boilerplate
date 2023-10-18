import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  APP_PORT: z.coerce.number().default(3333),
  API_PREFIX: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_IGNORE_TLS: z.coerce.boolean(),
  MAIL_SECURE: z.coerce.boolean(),
  MAIL_REQUIRE_TLS: z.coerce.boolean(),
  MAIL_DEFAULT_EMAIL: z.string(),
  MAIL_DEFAULT_NAME: z.string(),
  MAIL_CLIENT_PORT: z.coerce.number(),
})

export type Env = z.infer<typeof envSchema>
