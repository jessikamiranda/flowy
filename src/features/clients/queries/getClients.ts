import { createClient } from '@/lib/supabase/server'

import { type Client } from '../types/client'

export async function getClients() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clients')
    .select(
      `
        id,
        name,
        company,
        email,
        phone,
        status,
        created_at,
        updated_at
      `,
    )
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch clients: ${error.message}`)
  }

  return data as Client[]
}
