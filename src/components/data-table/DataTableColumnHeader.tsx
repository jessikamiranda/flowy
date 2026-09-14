'use client'

import type { Column, RowData } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { DataTableFeatures } from './data-table-features'

type Props<TData extends RowData, TValue = unknown> = {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData extends RowData, TValue = unknown>({
  column,
  title,
}: Props<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <span className="text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
        {title}
      </span>
    )
  }

  const sorting = column.getIsSorted()

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-2 h-8 rounded-lg px-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      onClick={column.getToggleSortingHandler()}
    >
      <span>{title}</span>

      {sorting === 'asc' ? (
        <ArrowUp aria-hidden="true" className="size-3.5" />
      ) : sorting === 'desc' ? (
        <ArrowDown aria-hidden="true" className="size-3.5" />
      ) : (
        <ArrowUpDown aria-hidden="true" className="size-3.5 opacity-50" />
      )}
    </Button>
  )
}
