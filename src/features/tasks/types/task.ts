export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskProjectClient = {
  id: string
  name: string
  company: string
}

export type TaskProject = {
  id: string
  name: string
  client: TaskProjectClient
}

export type Task = {
  id: string
  title: string
  description: string | null

  status: TaskStatus
  priority: TaskPriority

  due_date: string | null

  created_at: string
  updated_at: string

  project: TaskProject
}
