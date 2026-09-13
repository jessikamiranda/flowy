'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import {
  type ProjectFormValues,
  projectIdSchema,
  projectSchema,
} from '../schemas/project.schema'

export async function updateProject(projectId: string, values: ProjectFormValues) {
  const parsedId = projectIdSchema.safeParse(projectId)
  const parsedValues = projectSchema.safeParse(values)

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

  const { data, error } = await supabase
    .from('projects')
    .update({
      client_id: parsedValues.data.clientId,
      name: parsedValues.data.name,
      description: parsedValues.data.description || null,
      status: parsedValues.data.status,
      priority: parsedValues.data.priority,
      start_date: parsedValues.data.startDate || null,
      due_date: parsedValues.data.dueDate || null,
    })
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to update project:', error)

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
