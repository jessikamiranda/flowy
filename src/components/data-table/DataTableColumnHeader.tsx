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
    return <span>{title}</span>
  }

  const sorting = column.getIsSorted()

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-3"
      onClick={column.getToggleSortingHandler()}
    >
      <span>{title}</span>

      {sorting === 'asc' ? (
        <ArrowUp aria-hidden="true" />
      ) : sorting === 'desc' ? (
        <ArrowDown aria-hidden="true" />
      ) : (
        <ArrowUpDown aria-hidden="true" />
      )}
    </Button>
  )
}
