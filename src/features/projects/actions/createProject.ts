'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { type ProjectFormValues, projectSchema } from '../schemas/project.schema'

export async function createProject(values: ProjectFormValues) {
  const parsedValues = projectSchema.safeParse(values)

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

  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('id', parsedValues.data.clientId)
    .maybeSingle()

  if (!client) {
    return {
      success: false as const,
      error: 'invalid_client' as const,
    }
  }

  const { error } = await supabase.from('projects').insert({
    owner_id: userId,
    client_id: parsedValues.data.clientId,
    name: parsedValues.data.name,
    description: parsedValues.data.description || null,
    status: parsedValues.data.status,
    priority: parsedValues.data.priority,
    start_date: parsedValues.data.startDate || null,
    due_date: parsedValues.data.dueDate || null,
  })

  if (error) {
    console.error('Failed to create project:', error)

    return {
      success: false as const,
      error: 'database_error' as const,
    }
  }

  return {
    success: true as const,
  }
}
