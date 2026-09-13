import type { Project } from '@/features/projects/types/project'
import type { Task } from '@/features/tasks/types/task'
import { createClient } from '@/lib/supabase/server'

function serializeDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export async function getDashboardOverview() {
  const supabase = await createClient()

  const today = serializeDate(new Date())

  const [projectsResult, tasksResult] = await Promise.all([
    supabase
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
      .limit(5),

    supabase
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
      .neq('status', 'done')
      .not('due_date', 'is', null)
      .gte('due_date', today)
      .order('due_date', { ascending: true })
      .limit(5),
  ])

  const error = projectsResult.error ?? tasksResult.error

  if (error) {
    throw new Error(`Failed to fetch dashboard overview: ${error.message}`)
  }

  const recentProjects = (projectsResult.data ?? []).map((project) => {
    const client = Array.isArray(project.client) ? project.client[0] : project.client

    if (!client) {
      throw new Error(`Project ${project.id} has no client`)
    }

    return {
      ...project,
      client,
    } as Project
  })

  const upcomingTasks = (tasksResult.data ?? []).map((task) => {
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

  return {
    recentProjects,
    upcomingTasks,
  }
}
