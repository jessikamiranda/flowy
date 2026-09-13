'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { type ClientFormValues, clientSchema } from '../schemas/client.schema'

export async function createClient(values: ClientFormValues) {
  const parsedValues = clientSchema.safeParse(values)

  if (!parsedValues.success) {
    return {
      success: false as const,
      error: 'invalid_data' as const,
    }
  }

  const supabase = await createSupabaseClient()

  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub

  if (!userId) {
    return {
      success: false as const,
      error: 'unauthorized' as const,
    }
  }

  const { error } = await supabase.from('clients').insert({
    owner_id: userId,
    name: parsedValues.data.name,
    company: parsedValues.data.company,
    email: parsedValues.data.email || null,
    phone: parsedValues.data.phone || null,
    status: parsedValues.data.status,
  })

  if (error) {
    console.error('Failed to create client:', error)

    return {
      success: false as const,
      error: 'database_error' as const,
    }
  }

  return {
    success: true as const,
  }
}
