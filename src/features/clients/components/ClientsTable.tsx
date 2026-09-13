'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'

import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
} from '@/components/data-table'

import type { Client } from '../types/client'
import { ClientRowActions } from './ClientRowActions'

type Props = {
  clients: Client[]
}

const columnHelper = createDataTableColumnHelper<Client>()

export function ClientsTable({ clients }: Props) {
  const t = useTranslations('general.clients.table')
  const locale = useLocale()

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
      }),
    [locale],
  )

  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('name', {
          enableGlobalFilter: true,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.contact')} />
          ),

          cell: ({ getValue }) => (
            <span className="font-medium text-foreground">{getValue()}</span>
          ),

          meta: {
            label: t('columns.contact'),
          },
        }),

        columnHelper.accessor('company', {
          enableGlobalFilter: true,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.company')} />
          ),

          cell: ({ getValue }) => getValue(),

          meta: {
            label: t('columns.company'),
          },
        }),

        columnHelper.accessor('email', {
          enableGlobalFilter: true,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.email')} />
          ),

          cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue() || '—'}</span>
          ),

          meta: {
            label: t('columns.email'),
          },
        }),

        columnHelper.accessor('phone', {
          enableGlobalFilter: true,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.phone')} />
          ),

          cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue() || '—'}</span>
          ),

          meta: {
            label: t('columns.phone'),
          },
        }),

        columnHelper.accessor('status', {
          enableGlobalFilter: false,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.status')} />
          ),

          cell: ({ getValue }) => {
            const status = getValue()

            return (
              <span
                className={
                  status === 'active'
                    ? 'inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400'
                    : 'inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground'
                }
              >
                {status === 'active' ? t('status.active') : t('status.inactive')}
              </span>
            )
          },

          meta: {
            label: t('columns.status'),

            filter: {
              type: 'select',
              label: t('filters.statusLabel'),
              placeholder: t('filters.statusPlaceholder'),
              options: [
                {
                  label: t('status.active'),
                  value: 'active',
                },
                {
                  label: t('status.inactive'),
                  value: 'inactive',
                },
              ],
            },
          },

          filterFn: 'equalsString',
        }),

        columnHelper.accessor('created_at', {
          enableGlobalFilter: false,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.createdAt')} />
          ),

          cell: ({ getValue }) => dateFormatter.format(new Date(getValue())),

          meta: {
            label: t('columns.createdAt'),
          },
        }),

        {
          id: 'actions',

          size: 56,
          minSize: 56,
          maxSize: 56,

          enableSorting: false,
          enableHiding: false,
          enableResizing: false,
          enableGlobalFilter: false,

          header: () => <span className="sr-only">{t('columns.actions')}</span>,

          cell: ({ row }) => (
            <div className="flex justify-end">
              <ClientRowActions client={row.original} />
            </div>
          ),

          meta: {
            label: t('columns.actions'),
          },
        },
      ]),
    [dateFormatter, t],
  )

  return (
    <DataTable
      data={clients}
      columns={columns}
      getRowId={(client) => client.id}
      searchPlaceholder={t('searchPlaceholder')}
      pageSize={10}
    />
  )
}
