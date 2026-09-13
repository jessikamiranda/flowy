import { ArrowUpRight } from 'lucide-react'

import type { Project } from '@/features/projects/types/project'
import { Link } from '@/i18n/navigation'

type Props = {
  projects: Project[]
  title: string
  description: string
  emptyMessage: string
  viewAllLabel: string
  statusLabels: {
    planning: string
    inProgress: string
    onHold: string
    completed: string
  }
}

export function RecentProjects({
  projects,
  title,
  description,
  emptyMessage,
  viewAllLabel,
  statusLabels,
}: Props) {
  const labels = {
    planning: statusLabels.planning,
    in_progress: statusLabels.inProgress,
    on_hold: statusLabels.onHold,
    completed: statusLabels.completed,
  }

  const styles = {
    planning: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
    in_progress: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
    on_hold: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    completed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  }

  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex items-start justify-between gap-4 border-b p-6">
        <div>
          <h2 className="font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <Link
          href="/projects"
          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-primary hover:underline"
        >
          {viewAllLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="p-6 text-sm text-muted-foreground">{emptyMessage}</div>
      ) : (
        <div className="divide-y">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between gap-4 p-4 px-6"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{project.name}</p>

                <p className="truncate text-sm text-muted-foreground">
                  {project.client.company}
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${styles[project.status]}`}
              >
                {labels[project.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
