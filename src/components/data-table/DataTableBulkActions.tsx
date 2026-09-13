'use client'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

type Props = {
  selectedCount: number
  onClear: () => void
  children: ReactNode
}

export function DataTableBulkActions({ selectedCount, onClear, children }: Props) {
  const t = useTranslations('general.dataTable')

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-muted/40 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium" aria-live="polite">
        {t('selectedForActions', {
          count: selectedCount,
        })}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {children}

        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          <X aria-hidden="true" />
          {t('clearSelection')}
        </Button>
      </div>
    </div>
  )
}
