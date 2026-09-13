import { z } from 'zod'

import { getSharedFields, type SharedFieldMessages } from '@/utils/zod-shared-fields'

export const getLoginSchema = (messages: SharedFieldMessages) => {
  const fields = getSharedFields(messages)

  return z.object({
    email: fields.email,
    password: fields.requiredString,
  })
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginSchema>>
