'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'

import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
} from '@/components/data-table'
import type { Client } from '@/features/clients/types/client'

import type { Project } from '../types/project'
import { ProjectRowActions } from './ProjectRowActions'

type Props = {
  projects: Project[]
  clients: Client[]
}

const columnHelper = createDataTableColumnHelper<Project>()

function parseDatabaseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function ProjectsTable({ projects, clients }: Props) {
  const t = useTranslations('general.projects.table')
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
            <DataTableColumnHeader column={column} title={t('columns.project')} />
          ),

          cell: ({ row, getValue }) => (
            <div className="min-w-48">
              <p className="font-medium text-foreground">{getValue()}</p>

              {row.original.description && (
                <p className="max-w-72 truncate text-sm text-muted-foreground">
                  {row.original.description}
                </p>
              )}
            </div>
          ),

          meta: {
            label: t('columns.project'),
          },
        }),

        columnHelper.accessor((project) => project.client.company, {
          id: 'client',

          enableGlobalFilter: true,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.client')} />
          ),

          cell: ({ row, getValue }) => (
            <div className="min-w-40">
              <p className="font-medium text-foreground">{getValue()}</p>

              <p className="text-sm text-muted-foreground">{row.original.client.name}</p>
            </div>
          ),

          meta: {
            label: t('columns.client'),
          },
        }),

        columnHelper.accessor('status', {
          enableGlobalFilter: false,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.status')} />
          ),

          cell: ({ getValue }) => {
            const status = getValue()

            const styles = {
              planning: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
              in_progress: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
              on_hold: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
              completed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
            }

            const labels = {
              planning: t('status.planning'),
              in_progress: t('status.inProgress'),
              on_hold: t('status.onHold'),
              completed: t('status.completed'),
            }

            return (
              <span
                className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
              >
                {labels[status]}
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
                  label: t('status.planning'),
                  value: 'planning',
                },
                {
                  label: t('status.inProgress'),
                  value: 'in_progress',
                },
                {
                  label: t('status.onHold'),
                  value: 'on_hold',
                },
                {
                  label: t('status.completed'),
                  value: 'completed',
                },
              ],
            },
          },

          filterFn: 'equalsString',
        }),

        columnHelper.accessor('priority', {
          enableGlobalFilter: false,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.priority')} />
          ),

          cell: ({ getValue }) => {
            const priority = getValue()

            const styles = {
              low: 'bg-muted text-muted-foreground',
              medium: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
              high: 'bg-red-500/10 text-red-700 dark:text-red-300',
            }

            const labels = {
              low: t('priority.low'),
              medium: t('priority.medium'),
              high: t('priority.high'),
            }

            return (
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[priority]}`}
              >
                {labels[priority]}
              </span>
            )
          },

          meta: {
            label: t('columns.priority'),

            filter: {
              type: 'select',
              label: t('filters.priorityLabel'),
              placeholder: t('filters.priorityPlaceholder'),

              options: [
                {
                  label: t('priority.low'),
                  value: 'low',
                },
                {
                  label: t('priority.medium'),
                  value: 'medium',
                },
                {
                  label: t('priority.high'),
                  value: 'high',
                },
              ],
            },
          },

          filterFn: 'equalsString',
        }),

        columnHelper.accessor('start_date', {
          enableGlobalFilter: false,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.startDate')} />
          ),

          cell: ({ getValue }) => {
            const value = getValue()

            return (
              <span className="whitespace-nowrap text-muted-foreground">
                {value ? dateFormatter.format(parseDatabaseDate(value)) : '—'}
              </span>
            )
          },

          meta: {
            label: t('columns.startDate'),
          },
        }),

        columnHelper.accessor('due_date', {
          enableGlobalFilter: false,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.dueDate')} />
          ),

          cell: ({ getValue }) => {
            const value = getValue()

            return (
              <span className="whitespace-nowrap text-muted-foreground">
                {value ? dateFormatter.format(parseDatabaseDate(value)) : '—'}
              </span>
            )
          },

          meta: {
            label: t('columns.dueDate'),
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
              <ProjectRowActions project={row.original} clients={clients} />
            </div>
          ),

          meta: {
            label: t('columns.actions'),
          },
        },
      ]),
    [clients, dateFormatter, t],
  )

  return (
    <DataTable
      data={projects}
      columns={columns}
      getRowId={(project) => project.id}
      searchPlaceholder={t('searchPlaceholder')}
      pageSize={10}
    />
  )
}
