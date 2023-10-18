import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().max(30).default(''),
  password: z
    .string()
    .min(3)
    .max(20)
    .refine(value => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: 'Password must contain at least one punctuation symbol',
    })
    .default(''),
  rememberMe: z.boolean().default(false),
})
