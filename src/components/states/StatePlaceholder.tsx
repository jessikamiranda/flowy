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
  const isDestructive = variant === 'destructive'

  return (
    <div
      className={cn(
        'flex min-h-72 w-full flex-col items-center justify-center rounded-[1.5rem] bg-muted/25 px-6 py-14 text-center',
        isDestructive && 'bg-destructive/5',
        className,
      )}
    >
      {icon && (
        <div className="relative">
          {!isDestructive && (
            <span
              aria-hidden="true"
              className="absolute -right-1.5 -top-1.5 size-3 rounded-full bg-brand-lime ring-4 ring-background"
            />
          )}

          <div
            className={cn(
              'flex size-14 items-center justify-center rounded-2xl bg-accent text-primary',
              isDestructive && 'bg-destructive/10 text-destructive',
            )}
          >
            {icon}
          </div>
        </div>
      )}

      <div className={cn('max-w-md', icon && 'mt-5')}>
        <Title className="text-lg font-semibold tracking-[-0.025em]">{title}</Title>

        {description && (
          <div
            className={cn(
              'mt-2 text-sm leading-6 text-muted-foreground',
              isDestructive && 'text-foreground/65',
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
