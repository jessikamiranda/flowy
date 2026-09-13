'use server'

import { z } from 'zod'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'

import { projectIdSchema } from '../schemas/project.schema'

const projectInlineUpdateSchema = z.discriminatedUnion('field', [
  z.object({
    field: z.literal('status'),
    value: z.enum(['planning', 'in_progress', 'on_hold', 'completed']),
  }),
  z.object({
    field: z.literal('priority'),
    value: z.enum(['low', 'medium', 'high']),
  }),
])

type ProjectInlineUpdate = z.infer<typeof projectInlineUpdateSchema>

export async function updateProjectInline(
  projectId: string,
  update: ProjectInlineUpdate,
) {
  const parsedId = projectIdSchema.safeParse(projectId)
  const parsedUpdate = projectInlineUpdateSchema.safeParse(update)

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
    .from('projects')
    .update({
      [field]: value,
    })
    .eq('id', parsedId.data)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Failed to update project inline:', error)

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
