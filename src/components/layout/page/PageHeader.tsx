import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { type PageBreadcrumbItem, PageBreadcrumbs } from './PageBreadcrumbs'

type Props = {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  actions?: ReactNode
  breadcrumbs?: PageBreadcrumbItem[]
  className?: string
  headingAs?: 'h1' | 'h2' | 'h3'
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  breadcrumbs,
  className,
  headingAs: Heading = 'h1',
}: Props) {
  return (
    <div className={cn('space-y-5', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && <PageBreadcrumbs items={breadcrumbs} />}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
          )}

          <Heading className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            {title}
          </Heading>

          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  )
}
