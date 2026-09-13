'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { type TaskFormValues, taskIdSchema, taskSchema } from '../schemas/task.schema'

export async function updateTask(taskId: string, values: TaskFormValues) {
  const parsedId = taskIdSchema.safeParse(taskId)
  const parsedValues = taskSchema.safeParse(values)

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

  const { data, error } = await supabase
    .from('tasks')
    .update({
      project_id: parsedValues.data.projectId,
      title: parsedValues.data.title,
      description: parsedValues.data.description || null,
      status: parsedValues.data.status,
      priority: parsedValues.data.priority,
      due_date: parsedValues.data.dueDate || null,
    })
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to update task:', error)

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
