import type { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  value: number
  description: string
  icon: LucideIcon
}

export function DashboardMetricCard({ title, value, description, icon: Icon }: Props) {
  return (
    <section className="group rounded-[1.5rem] border border-border/60 bg-card/90 p-5 transition-colors hover:border-border sm:p-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {title}
          </p>

          <p className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{value}</p>

          <p className="mt-2 max-w-48 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary transition-transform group-hover:-rotate-3">
          <Icon aria-hidden="true" className="size-4" />
        </div>
      </div>
    </section>
  )
}
