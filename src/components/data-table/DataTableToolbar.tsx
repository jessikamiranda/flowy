'use client'

import type { ReactTable, RowData } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { DataTableFeatures } from './data-table-features'
import { DataTableColumnFilter } from './DataTableColumnFilter'
import { DataTableViewOptions } from './DataTableViewOptions'

type Props<TData extends RowData> = {
  table: ReactTable<DataTableFeatures, TData>

  enableGlobalSearch?: boolean
  enableColumnVisibility?: boolean

  searchPlaceholder?: string
}

export function DataTableToolbar<TData extends RowData>({
  table,
  enableGlobalSearch = true,
  enableColumnVisibility = true,
  searchPlaceholder,
}: Props<TData>) {
  const t = useTranslations('general.dataTable')

  const filterableColumns = table
    .getAllLeafColumns()
    .filter((column) => Boolean(column.columnDef.meta?.filter))

  const globalFilter = String(table.state.globalFilter ?? '')

  const hasActiveFilters = globalFilter.length > 0 || table.state.columnFilters.length > 0

  if (!enableGlobalSearch && !enableColumnVisibility && filterableColumns.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col items-start gap-2.5 rounded-[1.25rem] border border-border/60 bg-card/70 p-2.5 sm:flex-row sm:justify-between">
      <div className="flex w-full flex-1 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        {enableGlobalSearch && (
          <div className="relative w-full sm:w-80">
            <Search
              aria-hidden="true"
              className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/70"
            />

            <Input
              value={globalFilter}
              placeholder={searchPlaceholder ?? t('searchPlaceholder')}
              className="h-10 rounded-xl border-transparent bg-muted/60 pr-4 pl-10 shadow-none transition-colors focus-visible:border-ring focus-visible:bg-card"
              onChange={(event) => {
                table.setGlobalFilter(event.target.value)
              }}
            />
          </div>
        )}

        {filterableColumns.map((column) => (
          <DataTableColumnFilter key={column.id} column={column} />
        ))}

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 rounded-xl px-3 text-muted-foreground hover:text-foreground"
            onClick={() => {
              table.resetGlobalFilter(true)
              table.resetColumnFilters(true)
            }}
          >
            <X aria-hidden="true" />
            {t('clearFilters')}
          </Button>
        )}
      </div>

      {enableColumnVisibility && <DataTableViewOptions table={table} />}
    </div>
  )
}
