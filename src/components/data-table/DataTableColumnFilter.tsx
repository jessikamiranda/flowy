'use client'

import type { Column, RowData } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { DataTableFeatures } from './data-table-features'

const ALL_FILTER_VALUE = '__data_table_all__'

type Props<TData extends RowData> = {
  column: Column<DataTableFeatures, TData, unknown>
}

export function DataTableColumnFilter<TData extends RowData>({ column }: Props<TData>) {
  const t = useTranslations('general.dataTable')

  const filter = column.columnDef.meta?.filter

  if (!filter) {
    return null
  }

  if (filter.type === 'text') {
    const value = (column.getFilterValue() as string | undefined) ?? ''

    return (
      <Input
        value={value}
        aria-label={filter.label}
        placeholder={filter.placeholder}
        className="h-9 w-full sm:w-48"
        onChange={(event) => {
          column.setFilterValue(event.target.value)
        }}
      />
    )
  }

  const value = (column.getFilterValue() as string | undefined) ?? null

  return (
    <Select
      items={filter.options}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue === null || nextValue === ALL_FILTER_VALUE) {
          column.setFilterValue(undefined)
          return
        }

        column.setFilterValue(nextValue)
      }}
    >
      <SelectTrigger aria-label={filter.label} className="h-9 w-full sm:w-44">
        <SelectValue placeholder={filter.placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ALL_FILTER_VALUE}>{t('all')}</SelectItem>

        {filter.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
