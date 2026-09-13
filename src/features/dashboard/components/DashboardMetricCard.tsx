import type { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  value: number
  description: string
  icon: LucideIcon
}

export function DashboardMetricCard({ title, value, description, icon: Icon }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="text-3xl font-semibold tracking-tight">{value}</p>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </div>
      </div>
    </div>
  )
}
