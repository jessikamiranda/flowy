import { Circle, FolderKanban } from 'lucide-react'

import type { Project } from '@/features/projects/types/project'

import { DashboardPanelHeader } from './DashboardPanelHeader'

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
    planning: 'bg-violet-500/15 text-violet-800 dark:text-violet-200',
    in_progress: 'bg-blue-500/15 text-blue-800 dark:text-blue-200',
    on_hold: 'bg-amber-500/15 text-amber-800 dark:text-amber-200',
    completed: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
  }

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/90">
      <DashboardPanelHeader
        title={title}
        description={description}
        href="/projects"
        viewAllLabel={viewAllLabel}
      />

      {projects.length === 0 ? (
        <div className="mx-5 mb-5 flex min-h-48 flex-col items-center justify-center rounded-2xl bg-muted/45 px-6 text-center sm:mx-6 sm:mb-6">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-card text-muted-foreground ring-1 ring-border/60">
            <FolderKanban aria-hidden="true" className="size-4" />
          </div>

          <p className="mt-4 text-sm font-medium">{emptyMessage}</p>
        </div>
      ) : (
        <div className="px-2 pb-2 sm:px-3 sm:pb-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors hover:bg-muted/55 sm:px-3.5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <span className="text-sm font-bold uppercase">
                  {project.name.charAt(0)}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-[-0.01em]">
                  {project.name}
                </p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {project.client.company}
                </p>
              </div>

              <span
                className={`hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold sm:inline-flex ${styles[project.status]}`}
              >
                <Circle
                  aria-hidden="true"
                  className="size-1.5 fill-current stroke-none"
                />

                {labels[project.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
