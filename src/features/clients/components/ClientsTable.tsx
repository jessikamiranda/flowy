'use client'

import { Building2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { toast } from 'sonner'

import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  EditableSelectCell,
} from '@/components/data-table'
import { EmptyState } from '@/components/states'
import { useRouter } from '@/i18n/navigation'

import { updateClientInline } from '../actions/updateClientInline'
import type { Client } from '../types/client'
import { ClientRowActions } from './ClientRowActions'
import { NewClientSheet } from './NewClientSheet'

type Props = {
  clients: Client[]
}

const columnHelper = createDataTableColumnHelper<Client>()

export function ClientsTable({ clients }: Props) {
  const t = useTranslations('general.clients.table')
  const locale = useLocale()

  const messagesT = useTranslations('general.clients.messages')
  const router = useRouter()

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

          size: 240,
          minSize: 200,
          maxSize: 380,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.contact')} />
          ),

          cell: ({ row, getValue }) => (
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-xs font-bold uppercase text-primary">
                {getValue().charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-[-0.01em] text-foreground">
                  {getValue()}
                </p>

                {row.original.email && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {row.original.email}
                  </p>
                )}
              </div>
            </div>
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

          cell: ({ row, getValue }) => {
            const status = getValue()

            const styles = {
              active:
                'bg-emerald-500/40 text-emerald-800 hover:bg-emerald-500/45! dark:text-emerald-200',
              inactive: 'bg-muted text-muted-foreground hover:bg-muted/80',
            }

            return (
              <EditableSelectCell
                value={status}
                ariaLabel={t('inline.statusAriaLabel', {
                  client: row.original.name,
                })}
                options={[
                  {
                    value: 'active',
                    label: t('status.active'),
                  },
                  {
                    value: 'inactive',
                    label: t('status.inactive'),
                  },
                ]}
                className={`h-6! w-fit min-w-28 border-transparent px-2! font-medium [&_svg]:text-current [&_svg]:opacity-100 ${styles[status]}`}
                onSave={async (value) => {
                  const result = await updateClientInline(row.original.id, {
                    field: 'status',
                    value,
                  })

                  if (!result.success) {
                    throw new Error(result.error)
                  }

                  router.refresh()
                }}
                onSaveError={() => {
                  toast.error(messagesT('updateError'))
                }}
              />
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
    [dateFormatter, messagesT, router, t],
  )

  if (clients.length === 0) {
    return (
      <EmptyState
        icon={<Building2 aria-hidden="true" className="size-6" />}
        title={t('empty.title')}
        description={t('empty.description')}
        action={<NewClientSheet />}
        className="min-h-80"
      />
    )
  }

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
