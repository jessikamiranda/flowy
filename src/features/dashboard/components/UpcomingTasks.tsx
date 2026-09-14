import { CalendarDays, CheckCircle2 } from 'lucide-react'

import type { Task } from '@/features/tasks/types/task'

import { DashboardPanelHeader } from './DashboardPanelHeader'

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
    month: 'short',
    day: 'numeric',
  })

  const labels = {
    low: priorityLabels.low,
    medium: priorityLabels.medium,
    high: priorityLabels.high,
  }

  const styles = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-amber-500/15 text-amber-800 dark:text-amber-200',
    high: 'bg-red-500/15 text-red-800 dark:text-red-200',
  }

  const dots = {
    low: 'bg-muted-foreground/45',
    medium: 'bg-amber-500',
    high: 'bg-red-500',
  }

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/90">
      <DashboardPanelHeader
        title={title}
        description={description}
        href="/tasks"
        viewAllLabel={viewAllLabel}
      />

      {tasks.length === 0 ? (
        <div className="mx-5 mb-5 flex min-h-48 flex-col items-center justify-center rounded-2xl bg-muted/45 px-6 text-center sm:mx-6 sm:mb-6">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-card text-muted-foreground ring-1 ring-border/60">
            <CheckCircle2 aria-hidden="true" className="size-4" />
          </div>

          <p className="mt-4 text-sm font-medium">{emptyMessage}</p>
        </div>
      ) : (
        <div className="px-2 pb-2 sm:px-3 sm:pb-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors hover:bg-muted/55 sm:px-3.5"
            >
              <div className={`size-2 shrink-0 rounded-full ${dots[task.priority]}`} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-[-0.01em]">
                  {task.title}
                </p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {task.project.name}
                  <span className="px-1.5 text-border">/</span>
                  {task.project.client.company}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {task.due_date && (
                  <div className="hidden items-center gap-1.5 rounded-full bg-muted/70 px-2.5 py-1.5 text-xs font-medium text-muted-foreground sm:flex">
                    <CalendarDays aria-hidden="true" className="size-3.5" />

                    {dateFormatter.format(parseDatabaseDate(task.due_date))}
                  </div>
                )}

                <span
                  className={`hidden rounded-full px-2.5 py-1.5 text-[11px] font-semibold sm:inline-flex ${styles[task.priority]}`}
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
