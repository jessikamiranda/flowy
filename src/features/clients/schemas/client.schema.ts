import { z } from 'zod'

export const clientSchema = z.object({
  name: z.string().trim().min(1),
  company: z.string().trim().min(1),
  email: z.string().trim().email().or(z.literal('')),
  phone: z.string().trim(),
  status: z.enum(['active', 'inactive']),
})

export const clientIdSchema = z.string().uuid()

export type ClientFormValues = z.infer<typeof clientSchema>
