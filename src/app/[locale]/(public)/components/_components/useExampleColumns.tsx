'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'

import {
  createDataTableColumnHelper,
  DataTableColumnHeader,
  EditableNumberCell,
  EditableSelectCell,
  type EditableSelectOption,
  EditableTextCell,
} from '@/components/data-table'
import { formatCurrency, formatDate } from '@/lib/format'

import type {
  ExampleTableRow,
  ExampleTableStatus,
  UpdateExampleTableRow,
} from './example-data'

const columnHelper = createDataTableColumnHelper<ExampleTableRow>()

type Props = {
  onUpdate: UpdateExampleTableRow
}

export function useExampleColumns({ onUpdate }: Props) {
  const t = useTranslations('general.showcase.dataTable')
  const locale = useLocale()

  return useMemo(() => {
    const statusOptions: EditableSelectOption<ExampleTableStatus>[] = [
      {
        value: 'active',
        label: t('status.active'),
      },
      {
        value: 'pending',
        label: t('status.pending'),
      },
      {
        value: 'inactive',
        label: t('status.inactive'),
      },
    ]

    return columnHelper.columns([
      columnHelper.accessor('name', {
        size: 240,
        minSize: 160,
        maxSize: 420,

        enableGlobalFilter: true,

        meta: {
          label: t('columns.name'),
        },

        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('columns.name')} />
        ),

        cell: ({ getValue, row }) => (
          <EditableTextCell
            value={getValue()}
            ariaLabel={t('editName', {
              name: row.original.name,
            })}
            onSave={(name) =>
              onUpdate(row.original.id, {
                name,
              })
            }
          />
        ),
      }),

      columnHelper.accessor('email', {
        size: 260,
        minSize: 180,
        maxSize: 420,

        enableGlobalFilter: true,

        filterFn: 'includesString',

        meta: {
          label: t('columns.email'),

          filter: {
            type: 'text',
            label: t('filters.emailLabel'),
            placeholder: t('filters.emailPlaceholder'),
          },
        },

        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('columns.email')} />
        ),

        cell: ({ getValue }) => (
          <span className="text-muted-foreground">{getValue()}</span>
        ),
      }),

      columnHelper.accessor('status', {
        size: 160,
        minSize: 130,
        maxSize: 220,

        enableGlobalFilter: false,

        filterFn: 'equalsString',

        meta: {
          label: t('columns.status'),

          filter: {
            type: 'select',
            label: t('filters.statusLabel'),
            placeholder: t('filters.statusPlaceholder'),
            options: statusOptions,
          },
        },

        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('columns.status')} />
        ),

        cell: ({ getValue, row }) => (
          <EditableSelectCell
            value={getValue()}
            options={statusOptions}
            ariaLabel={t('editStatus', {
              name: row.original.name,
            })}
            onSave={(status) =>
              onUpdate(row.original.id, {
                status,
              })
            }
          />
        ),
      }),

      columnHelper.accessor('budget', {
        size: 180,
        minSize: 140,
        maxSize: 240,

        enableGlobalFilter: false,

        meta: {
          label: t('columns.budget'),
        },

        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('columns.budget')} />
        ),

        cell: ({ getValue, row }) => (
          <EditableNumberCell
            value={getValue()}
            min={0}
            step={100}
            ariaLabel={t('editBudget', {
              name: row.original.name,
            })}
            displayValue={(value) => formatCurrency(value, locale, 'USD')}
            onSave={(budget) =>
              onUpdate(row.original.id, {
                budget,
              })
            }
          />
        ),
      }),

      columnHelper.accessor('createdAt', {
        size: 180,
        minSize: 140,
        maxSize: 240,

        enableGlobalFilter: false,

        meta: {
          label: t('columns.createdAt'),
        },

        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('columns.createdAt')} />
        ),

        cell: ({ getValue }) => formatDate(getValue(), locale),
      }),
    ])
  }, [locale, onUpdate, t])
}
