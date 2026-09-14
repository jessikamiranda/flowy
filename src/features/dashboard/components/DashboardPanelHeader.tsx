import { ArrowUpRight } from 'lucide-react'

import { Link } from '@/i18n/navigation'

type Props = {
  title: string
  description: string
  href: '/projects' | '/tasks'
  viewAllLabel: string
}

export function DashboardPanelHeader({ title, description, href, viewAllLabel }: Props) {
  return (
    <div className="flex items-start justify-between gap-5 px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-[-0.02em]">{title}</h2>

        <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
      </div>

      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-accent"
      >
        {viewAllLabel}

        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </Link>
    </div>
  )
}
