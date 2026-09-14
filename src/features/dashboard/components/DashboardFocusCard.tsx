import { ArrowUpRight, CircleAlert, Clock3, ListTodo } from 'lucide-react'

import { Link } from '@/i18n/navigation'

type Props = {
  eyebrow: string
  openTasks: number
  openTasksLabel: string
  dueSoon: number
  dueSoonLabel: string
  overdue: number
  overdueLabel: string
  viewTasksLabel: string
}

export function DashboardFocusCard({
  eyebrow,
  openTasks,
  openTasksLabel,
  dueSoon,
  dueSoonLabel,
  overdue,
  overdueLabel,
  viewTasksLabel,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-brand-ink p-6 text-brand-cream sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 size-56 rounded-full bg-brand-violet"
      />

      <div
        aria-hidden="true"
        className="absolute right-16 top-14 size-5 rounded-full bg-brand-lime"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
            {eyebrow}
          </p>

          <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10">
            <ListTodo aria-hidden="true" className="size-5" />
          </div>
        </div>

        <div className="mt-10">
          <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
            {openTasks}
          </p>

          <p className="mt-2 text-sm font-medium text-white/90">{openTasksLabel}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Clock3 aria-hidden="true" className="mb-4 size-4 text-brand-lime" />

            <p className="text-2xl font-semibold tracking-tight">{dueSoon}</p>

            <p className="mt-1 text-xs leading-relaxed text-white/90">{dueSoonLabel}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <CircleAlert aria-hidden="true" className="mb-4 size-4 text-red-300" />

            <p className="text-2xl font-semibold tracking-tight">{overdue}</p>

            <p className="mt-1 text-xs leading-relaxed text-white/90">{overdueLabel}</p>
          </div>
        </div>

        <Link
          href="/tasks"
          className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-lime transition-opacity hover:opacity-75"
        >
          {viewTasksLabel}

          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  )
}
