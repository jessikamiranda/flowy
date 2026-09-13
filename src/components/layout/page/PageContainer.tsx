import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  size?: 'default' | 'wide' | 'full'
}

const sizeClasses = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
} as const

export function PageContainer({ children, className, size = 'default' }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 py-6 sm:px-6 lg:px-8',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
