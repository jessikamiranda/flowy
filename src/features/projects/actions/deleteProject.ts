'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { projectIdSchema } from '../schemas/project.schema'

export async function deleteProject(projectId: string) {
  const parsedId = projectIdSchema.safeParse(projectId)

  if (!parsedId.success) {
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
    .from('projects')
    .delete()
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to delete project:', error)

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
