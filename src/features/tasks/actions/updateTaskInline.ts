'use server'

import { z } from 'zod'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { taskIdSchema } from '../schemas/task.schema'

const taskInlineUpdateSchema = z.discriminatedUnion('field', [
  z.object({
    field: z.literal('status'),
    value: z.enum(['todo', 'in_progress', 'done']),
  }),
  z.object({
    field: z.literal('priority'),
    value: z.enum(['low', 'medium', 'high']),
  }),
])

type TaskInlineUpdate = z.infer<typeof taskInlineUpdateSchema>

export async function updateTaskInline(taskId: string, update: TaskInlineUpdate) {
  const parsedId = taskIdSchema.safeParse(taskId)
  const parsedUpdate = taskInlineUpdateSchema.safeParse(update)

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
    .from('tasks')
    .update({
      [field]: value,
    })
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to update task inline:', error)

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
