'use client'

import { CalendarDays } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'

import type { TaskStatus } from '../types/task'

type Props = {
  dueDate: string | null
  status: TaskStatus
}

function parseDatabaseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function differenceInDays(from: Date, to: Date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24

  return Math.round(
    (startOfDay(to).getTime() - startOfDay(from).getTime()) / millisecondsPerDay,
  )
}

export function TaskDueDate({ dueDate, status }: Props) {
  const t = useTranslations('general.tasks.deadline')
  const locale = useLocale()

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
      }),
    [locale],
  )

  if (!dueDate) {
    return <span className="text-muted-foreground">—</span>
  }

  const date = parseDatabaseDate(dueDate)
  const today = startOfDay(new Date())
  const daysUntilDue = differenceInDays(today, date)

  const formattedDate = formatter.format(date)

  if (status === 'done') {
    return (
      <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
        <CalendarDays aria-hidden="true" className="size-4" />

        {formattedDate}
      </div>
    )
  }

  if (daysUntilDue < 0) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex w-fit rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-300">
          {t('overdue')}
        </span>

        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {formattedDate}
        </span>
      </div>
    )
  }

  if (daysUntilDue === 0) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex w-fit rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-300">
          {t('today')}
        </span>

        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {formattedDate}
        </span>
      </div>
    )
  }

  if (daysUntilDue === 1) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex w-fit rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
          {t('tomorrow')}
        </span>

        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {formattedDate}
        </span>
      </div>
    )
  }

  if (daysUntilDue <= 7) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex w-fit rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
          {t('inDays', {
            count: daysUntilDue,
          })}
        </span>

        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {formattedDate}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
      <CalendarDays aria-hidden="true" className="size-4" />

      {formattedDate}
    </div>
  )
}
