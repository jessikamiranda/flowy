import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { TaskDueDate } from './TaskDueDate'

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => {
    return (
      key: string,
      values?: {
        count?: number
      },
    ) => {
      const messages: Record<string, string> = {
        overdue: 'Overdue',
        today: 'Due today',
        tomorrow: 'Tomorrow',
        inDays: `In ${values?.count} days`,
      }

      return messages[key] ?? key
    }
  },
}))

describe('TaskDueDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    vi.setSystemTime(new Date(2026, 8, 13, 12))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders a dash when there is no due date', () => {
    render(<TaskDueDate dueDate={null} status="todo" />)

    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('renders overdue state', () => {
    render(<TaskDueDate dueDate="2026-09-10" status="todo" />)

    expect(screen.getByText('Overdue')).toBeInTheDocument()

    expect(screen.getByText('Sep 10, 2026')).toBeInTheDocument()
  })

  it('renders due today state', () => {
    render(<TaskDueDate dueDate="2026-09-13" status="in_progress" />)

    expect(screen.getByText('Due today')).toBeInTheDocument()
  })

  it('renders tomorrow state', () => {
    render(<TaskDueDate dueDate="2026-09-14" status="todo" />)

    expect(screen.getByText('Tomorrow')).toBeInTheDocument()
  })

  it('renders the number of days for a nearby deadline', () => {
    render(<TaskDueDate dueDate="2026-09-18" status="todo" />)

    expect(screen.getByText('In 5 days')).toBeInTheDocument()
  })

  it('does not show deadline warnings for a completed task', () => {
    render(<TaskDueDate dueDate="2026-09-10" status="done" />)

    expect(screen.queryByText('Overdue')).not.toBeInTheDocument()

    expect(screen.getByText('Sep 10, 2026')).toBeInTheDocument()
  })

  it('renders only the date for a later deadline', () => {
    render(<TaskDueDate dueDate="2026-09-30" status="todo" />)

    expect(screen.getByText('Sep 30, 2026')).toBeInTheDocument()

    expect(screen.queryByText(/In \d+ days/)).not.toBeInTheDocument()
  })
})
