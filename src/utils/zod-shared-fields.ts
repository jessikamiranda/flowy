import { z } from 'zod'

export type SharedFieldMessages = {
  required: string
  invalidEmail: string
}

export function getSharedFields(messages: SharedFieldMessages) {
  return {
    requiredString: z.string().min(1, messages.required),
    optionalString: z.string().optional(),
    email: z.string().email(messages.invalidEmail),
  }
}
