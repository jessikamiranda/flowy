'use client'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode

  hasActiveFilters?: boolean
  onClear?: () => void

  actions?: ReactNode
  className?: string
}

export function FilterBar({
  children,
  hasActiveFilters = false,
  onClear,
  actions,
  className,
}: Props) {
  const t = useTranslations('general.filters')

  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {children}

        {hasActiveFilters && onClear && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear}>
            <X aria-hidden="true" />

            {t('clear')}
          </Button>
        )}
      </div>

      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
