'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'

import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
} from '@/components/data-table'
import { type Project } from '@/features/projects/types/project'

import type { Task } from '../types/task'
import { TaskRowActions } from './TaskRowActions'

type Props = {
  tasks: Task[]
  projects: Project[]
}

const columnHelper = createDataTableColumnHelper<Task>()

function parseDatabaseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function TasksTable({ tasks, projects }: Props) {
  const t = useTranslations('general.tasks.table')
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
        columnHelper.accessor('title', {
          enableGlobalFilter: true,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.task')} />
          ),

          cell: ({ row, getValue }) => (
            <div className="min-w-52">
              <p className="font-medium text-foreground">{getValue()}</p>

              {row.original.description && (
                <p className="max-w-80 truncate text-sm text-muted-foreground">
                  {row.original.description}
                </p>
              )}
            </div>
          ),

          meta: {
            label: t('columns.task'),
          },
        }),

        columnHelper.accessor(
          (task) => `${task.project.name} ${task.project.client.company}`,
          {
            id: 'project',

            enableGlobalFilter: true,

            header: ({ column }) => (
              <DataTableColumnHeader column={column} title={t('columns.project')} />
            ),

            cell: ({ row }) => (
              <div className="min-w-48">
                <p className="font-medium text-foreground">{row.original.project.name}</p>

                <p className="text-sm text-muted-foreground">
                  {row.original.project.client.company}
                </p>
              </div>
            ),

            meta: {
              label: t('columns.project'),
            },
          },
        ),

        columnHelper.accessor('status', {
          enableGlobalFilter: false,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.status')} />
          ),

          cell: ({ getValue }) => {
            const status = getValue()

            const styles = {
              todo: 'bg-muted text-muted-foreground',
              in_progress: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
              done: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
            }

            const labels = {
              todo: t('status.todo'),
              in_progress: t('status.inProgress'),
              done: t('status.done'),
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
                  label: t('status.todo'),
                  value: 'todo',
                },
                {
                  label: t('status.inProgress'),
                  value: 'in_progress',
                },
                {
                  label: t('status.done'),
                  value: 'done',
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
              <TaskRowActions task={row.original} projects={projects} />
            </div>
          ),

          meta: {
            label: t('columns.actions'),
          },
        },
      ]),
    [dateFormatter, projects, t],
  )

  return (
    <DataTable
      data={tasks}
      columns={columns}
      getRowId={(task) => task.id}
      searchPlaceholder={t('searchPlaceholder')}
      pageSize={10}
    />
  )
}
