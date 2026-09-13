import { describe, expect, it } from 'vitest'

import { getTaskDeadlineState } from './getTaskDeadlineState'

const today = new Date(2026, 8, 13)

describe('getTaskDeadlineState', () => {
  it('returns none when the task has no due date', () => {
    expect(getTaskDeadlineState(null, 'todo', today)).toEqual({
      state: 'none',
      daysUntilDue: null,
    })
  })

  it('returns completed for a done task', () => {
    expect(getTaskDeadlineState('2026-09-10', 'done', today)).toEqual({
      state: 'completed',
      daysUntilDue: null,
    })
  })

  it('identifies an overdue task', () => {
    expect(getTaskDeadlineState('2026-09-10', 'todo', today)).toEqual({
      state: 'overdue',
      daysUntilDue: -3,
    })
  })

  it('identifies a task due today', () => {
    expect(getTaskDeadlineState('2026-09-13', 'in_progress', today)).toEqual({
      state: 'today',
      daysUntilDue: 0,
    })
  })

  it('identifies a task due tomorrow', () => {
    expect(getTaskDeadlineState('2026-09-14', 'todo', today)).toEqual({
      state: 'tomorrow',
      daysUntilDue: 1,
    })
  })

  it('identifies a task due within seven days', () => {
    expect(getTaskDeadlineState('2026-09-18', 'todo', today)).toEqual({
      state: 'soon',
      daysUntilDue: 5,
    })
  })

  it('still considers exactly seven days as soon', () => {
    expect(getTaskDeadlineState('2026-09-20', 'todo', today)).toEqual({
      state: 'soon',
      daysUntilDue: 7,
    })
  })

  it('identifies a later deadline', () => {
    expect(getTaskDeadlineState('2026-09-21', 'todo', today)).toEqual({
      state: 'later',
      daysUntilDue: 8,
    })
  })
})
