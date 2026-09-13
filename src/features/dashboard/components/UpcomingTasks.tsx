import { ArrowUpRight, CalendarDays } from 'lucide-react'

import type { Task } from '@/features/tasks/types/task'
import { Link } from '@/i18n/navigation'

type Props = {
  tasks: Task[]
  locale: string
  title: string
  description: string
  emptyMessage: string
  viewAllLabel: string
  priorityLabels: {
    low: string
    medium: string
    high: string
  }
}

function parseDatabaseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function UpcomingTasks({
  tasks,
  locale,
  title,
  description,
  emptyMessage,
  viewAllLabel,
  priorityLabels,
}: Props) {
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  })

  const labels = {
    low: priorityLabels.low,
    medium: priorityLabels.medium,
    high: priorityLabels.high,
  }

  const styles = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    high: 'bg-red-500/10 text-red-700 dark:text-red-300',
  }

  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex items-start justify-between gap-4 border-b p-6">
        <div>
          <h2 className="font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {viewAllLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="p-6 text-sm text-muted-foreground">{emptyMessage}</div>
      ) : (
        <div className="divide-y">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-4 p-4 px-6"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{task.title}</p>

                <p className="truncate text-sm text-muted-foreground">
                  {task.project.name} · {task.project.client.company}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {task.due_date && (
                  <div className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
                    <CalendarDays className="size-4" aria-hidden="true" />

                    {dateFormatter.format(parseDatabaseDate(task.due_date))}
                  </div>
                )}

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[task.priority]}`}
                >
                  {labels[task.priority]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
