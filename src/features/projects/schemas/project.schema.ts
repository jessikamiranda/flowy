import { z } from 'zod'

export const projectSchema = z
  .object({
    clientId: z.string().uuid(),
    name: z.string().trim().min(1),
    description: z.string().trim(),
    status: z.enum(['planning', 'in_progress', 'on_hold', 'completed']),
    priority: z.enum(['low', 'medium', 'high']),
    startDate: z.string(),
    dueDate: z.string(),
  })
  .superRefine((values, context) => {
    if (values.startDate && values.dueDate && values.dueDate < values.startDate) {
      context.addIssue({
        code: 'custom',
        path: ['dueDate'],
        message: 'due_date_before_start_date',
      })
    }
  })

export const projectIdSchema = z.string().uuid()

export type ProjectFormValues = z.infer<typeof projectSchema>
