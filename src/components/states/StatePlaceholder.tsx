import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type StateTitleElement = 'h2' | 'h3' | 'h4' | 'p'

type Props = {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
  variant?: 'default' | 'destructive'
  titleAs?: StateTitleElement
}

export function StatePlaceholder({
  icon,
  title,
  description,
  action,
  className,
  variant = 'default',
  titleAs: Title = 'h2',
}: Props) {
  return (
    <div
      className={cn(
        'flex min-h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center',
        variant === 'destructive' && 'border-destructive/30 bg-destructive/5',
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            'mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground',
            variant === 'destructive' && 'bg-destructive/10 text-destructive',
          )}
        >
          {icon}
        </div>
      )}

      <div className="max-w-md space-y-1.5">
        <Title className="text-lg font-semibold">{title}</Title>

        {description && (
          <div
            className={cn(
              'text-sm text-muted-foreground',
              variant === 'destructive' && 'text-foreground/70',
            )}
          >
            {description}
          </div>
        )}
      </div>

      {action && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {action}
        </div>
      )}
    </div>
  )
}
