import { z } from 'zod'

export const taskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().trim().min(1),
  description: z.string().trim(),
  status: z.enum(['todo', 'in_progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string(),
})

export const taskIdSchema = z.string().uuid()

export type TaskFormValues = z.infer<typeof taskSchema>
