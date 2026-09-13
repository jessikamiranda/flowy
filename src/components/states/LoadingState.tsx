import { LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  label: ReactNode
  showLabel?: boolean
  className?: string
}

export function LoadingState({ label, showLabel = true, className }: Props) {
  return (
    <div
      className={cn(
        'flex min-h-64 w-full flex-col items-center justify-center gap-3',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        aria-hidden="true"
        className="size-6 animate-spin text-muted-foreground"
      />

      <span className={cn('text-sm text-muted-foreground', !showLabel && 'sr-only')}>
        {label}
      </span>
    </div>
  )
}
