import { describe, expect, it } from 'vitest'

import { projectSchema } from './project.schema'

const validProject = {
  clientId: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Website Redesign',
  description: 'Redesign the company website',
  status: 'in_progress' as const,
  priority: 'high' as const,
  startDate: '2026-09-10',
  dueDate: '2026-09-30',
}

describe('projectSchema', () => {
  it('accepts valid project data', () => {
    const result = projectSchema.safeParse(validProject)

    expect(result.success).toBe(true)
  })

  it('allows empty start and due dates', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      startDate: '',
      dueDate: '',
    })

    expect(result.success).toBe(true)
  })

  it('rejects a due date before the start date', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      startDate: '2026-09-20',
      dueDate: '2026-09-10',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['dueDate'],
            message: 'due_date_before_start_date',
          }),
        ]),
      )
    }
  })

  it('allows the due date to be the same as the start date', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      startDate: '2026-09-20',
      dueDate: '2026-09-20',
    })

    expect(result.success).toBe(true)
  })

  it('rejects an invalid client id', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      clientId: 'not-a-uuid',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['clientId'],
          }),
        ]),
      )
    }
  })

  it('requires a project name', () => {
    const result = projectSchema.safeParse({
      ...validProject,
      name: '   ',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['name'],
          }),
        ]),
      )
    }
  })
})
