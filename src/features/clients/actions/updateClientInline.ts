'use server'

import { z } from 'zod'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { clientIdSchema } from '../schemas/client.schema'

const clientInlineUpdateSchema = z.discriminatedUnion('field', [
  z.object({
    field: z.literal('status'),
    value: z.enum(['active', 'inactive']),
  }),
])

type ClientInlineUpdate = z.infer<typeof clientInlineUpdateSchema>

export async function updateClientInline(clientId: string, update: ClientInlineUpdate) {
  const parsedId = clientIdSchema.safeParse(clientId)
  const parsedUpdate = clientInlineUpdateSchema.safeParse(update)

  if (!parsedId.success || !parsedUpdate.success) {
    return {
      success: false as const,
      error: 'invalid_data' as const,
    }
  }

  const supabase = await createSupabaseClient()

  const { data: claimsData } = await supabase.auth.getClaims()

  if (!claimsData?.claims?.sub) {
    return {
      success: false as const,
      error: 'unauthorized' as const,
    }
  }

  const { field, value } = parsedUpdate.data

  const { data, error } = await supabase
    .from('clients')
    .update({
      [field]: value,
    })
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to update client inline:', error)

    return {
      success: false as const,
      error: 'database_error' as const,
    }
  }

  if (!data) {
    return {
      success: false as const,
      error: 'not_found' as const,
    }
  }

  return {
    success: true as const,
  }
}
