import { describe, expect, it } from 'vitest'

import { taskSchema } from './task.schema'

const validTask = {
  projectId: '550e8400-e29b-41d4-a716-446655440000',
  title: 'Design homepage',
  description: 'Create the first homepage version',
  status: 'todo' as const,
  priority: 'high' as const,
  dueDate: '2026-09-20',
}

describe('taskSchema', () => {
  it('accepts valid task data', () => {
    const result = taskSchema.safeParse(validTask)

    expect(result.success).toBe(true)
  })

  it('trims the title and description', () => {
    const result = taskSchema.safeParse({
      ...validTask,
      title: '  Design homepage  ',
      description: '  Create the first version  ',
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.title).toBe('Design homepage')
      expect(result.data.description).toBe('Create the first version')
    }
  })

  it('requires a task title', () => {
    const result = taskSchema.safeParse({
      ...validTask,
      title: '   ',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['title'],
          }),
        ]),
      )
    }
  })

  it('rejects an invalid project id', () => {
    const result = taskSchema.safeParse({
      ...validTask,
      projectId: 'invalid-id',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['projectId'],
          }),
        ]),
      )
    }
  })

  it('rejects an invalid status', () => {
    const result = taskSchema.safeParse({
      ...validTask,
      status: 'cancelled',
    })

    expect(result.success).toBe(false)
  })

  it('allows an empty due date', () => {
    const result = taskSchema.safeParse({
      ...validTask,
      dueDate: '',
    })

    expect(result.success).toBe(true)
  })
})
