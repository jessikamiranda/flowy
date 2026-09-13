import { createClient } from '@/lib/supabase/server'

import type { Task } from '../types/task'

export async function getTasks() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tasks')
    .select(
      `
        id,
        title,
        description,
        status,
        priority,
        due_date,
        created_at,
        updated_at,
        project:projects (
          id,
          name,
          client:clients (
            id,
            name,
            company
          )
        )
      `,
    )
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`)
  }

  return (data ?? []).map((task) => {
    const project = Array.isArray(task.project) ? task.project[0] : task.project

    if (!project) {
      throw new Error(`Task ${task.id} has no project`)
    }

    const client = Array.isArray(project.client) ? project.client[0] : project.client

    if (!client) {
      throw new Error(`Project ${project.id} linked to task ${task.id} has no client`)
    }

    return {
      ...task,
      project: {
        ...project,
        client,
      },
    } as Task
  })
}
