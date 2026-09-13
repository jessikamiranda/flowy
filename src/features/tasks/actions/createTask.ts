'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { type TaskFormValues, taskSchema } from '../schemas/task.schema'

export async function createTask(values: TaskFormValues) {
  const parsedValues = taskSchema.safeParse(values)

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

  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', parsedValues.data.projectId)
    .maybeSingle()

  if (!project) {
    return {
      success: false as const,
      error: 'invalid_project' as const,
    }
  }

  const { error } = await supabase.from('tasks').insert({
    owner_id: userId,
    project_id: parsedValues.data.projectId,
    title: parsedValues.data.title,
    description: parsedValues.data.description || null,
    status: parsedValues.data.status,
    priority: parsedValues.data.priority,
    due_date: parsedValues.data.dueDate || null,
  })

  if (error) {
    console.error('Failed to create task:', error)

    return {
      success: false as const,
      error: 'database_error' as const,
    }
  }

  return {
    success: true as const,
  }
}
