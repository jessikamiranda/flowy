'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { taskIdSchema } from '../schemas/task.schema'

export async function deleteTask(taskId: string) {
  const parsedId = taskIdSchema.safeParse(taskId)

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
    .from('tasks')
    .delete()
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to delete task:', error)

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
