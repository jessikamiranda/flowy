import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { type PageBreadcrumbItem, PageBreadcrumbs } from './PageBreadcrumbs'

type Props = {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  breadcrumbs?: PageBreadcrumbItem[]
  className?: string
  headingAs?: 'h1' | 'h2' | 'h3'
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
  headingAs: Heading = 'h1',
}: Props) {
  return (
    <div className={cn('space-y-4', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && <PageBreadcrumbs items={breadcrumbs} />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <Heading className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </Heading>

          {description && (
            <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
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
