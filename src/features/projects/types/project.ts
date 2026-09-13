export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed'

export type ProjectPriority = 'low' | 'medium' | 'high'

export type ProjectClient = {
  id: string
  name: string
  company: string
}

export type Project = {
  id: string
  name: string
  description: string | null

  status: ProjectStatus
  priority: ProjectPriority

  start_date: string | null
  due_date: string | null

  created_at: string
  updated_at: string

  client: ProjectClient
}
