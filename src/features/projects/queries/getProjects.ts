import { createClient } from '@/lib/supabase/server'

import type { Project } from '../types/project'

export async function getProjects() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select(
      `
        id,
        name,
        description,
        status,
        priority,
        start_date,
        due_date,
        created_at,
        updated_at,
        client:clients (
          id,
          name,
          company
        )
      `,
    )
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`)
  }

  return (data ?? []).map((project) => {
    const client = Array.isArray(project.client) ? project.client[0] : project.client

    if (!client) {
      throw new Error(`Project ${project.id} has no client`)
    }

    return {
      ...project,
      client,
    } as Project
  })
}
