'use client'

import type { ReactTable, RowData } from '@tanstack/react-table'
import { Columns3 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { DataTableFeatures } from './data-table-features'

type Props<TData extends RowData> = {
  table: ReactTable<DataTableFeatures, TData>
}

export function DataTableViewOptions<TData extends RowData>({ table }: Props<TData>) {
  const t = useTranslations('general.dataTable')

  const columns = table.getAllLeafColumns().filter((column) => column.getCanHide())

  if (columns.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 rounded-xl border border-transparent bg-muted/60 px-3 text-muted-foreground shadow-none hover:bg-muted hover:text-foreground"
          />
        }
      >
        <Columns3 aria-hidden="true" />
        {t('columns')}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-2xl">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('toggleColumns')}</DropdownMenuLabel>

          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(checked) => {
                column.toggleVisibility(checked)
              }}
            >
              {column.columnDef.meta?.label ?? column.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
