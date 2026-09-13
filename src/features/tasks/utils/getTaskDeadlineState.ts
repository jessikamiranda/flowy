import type { TaskStatus } from '../types/task'

export type TaskDeadlineState =
  'none' | 'completed' | 'overdue' | 'today' | 'tomorrow' | 'soon' | 'later'

type Result = {
  state: TaskDeadlineState
  daysUntilDue: number | null
}

function parseDatabaseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function getDayNumber(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
}

function differenceInDays(from: Date, to: Date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24

  return Math.round((getDayNumber(to) - getDayNumber(from)) / millisecondsPerDay)
}

export function getTaskDeadlineState(
  dueDate: string | null,
  status: TaskStatus,
  today = new Date(),
): Result {
  if (!dueDate) {
    return {
      state: 'none',
      daysUntilDue: null,
    }
  }

  if (status === 'done') {
    return {
      state: 'completed',
      daysUntilDue: null,
    }
  }

  const date = parseDatabaseDate(dueDate)
  const daysUntilDue = differenceInDays(today, date)

  if (daysUntilDue < 0) {
    return {
      state: 'overdue',
      daysUntilDue,
    }
  }

  if (daysUntilDue === 0) {
    return {
      state: 'today',
      daysUntilDue,
    }
  }

  if (daysUntilDue === 1) {
    return {
      state: 'tomorrow',
      daysUntilDue,
    }
  }

  if (daysUntilDue <= 7) {
    return {
      state: 'soon',
      daysUntilDue,
    }
  }

  return {
    state: 'later',
    daysUntilDue,
  }
}
