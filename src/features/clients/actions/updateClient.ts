'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import {
  type ClientFormValues,
  clientIdSchema,
  clientSchema,
} from '../schemas/client.schema'

export async function updateClient(clientId: string, values: ClientFormValues) {
  const parsedId = clientIdSchema.safeParse(clientId)
  const parsedValues = clientSchema.safeParse(values)

  if (!parsedId.success || !parsedValues.success) {
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

  const { data, error } = await supabase
    .from('clients')
    .update({
      name: parsedValues.data.name,
      company: parsedValues.data.company,
      email: parsedValues.data.email || null,
      phone: parsedValues.data.phone || null,
      status: parsedValues.data.status,
    })
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to update client:', error)

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
