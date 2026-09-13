'use client'

import { ArrowRight, ListTodo } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { toast } from 'sonner'

import {
  createDataTableColumnHelper,
  DataTable,
  DataTableColumnHeader,
  EditableSelectCell,
} from '@/components/data-table'
import { EmptyState } from '@/components/states'
import { buttonVariants } from '@/components/ui/button'
import { type Project } from '@/features/projects/types/project'
import { Link, useRouter } from '@/i18n/navigation'

import { updateTaskInline } from '../actions/updateTaskInline'
import type { Task } from '../types/task'
import { NewTaskSheet } from './NewTaskSheet'
import { TaskDueDate } from './TaskDueDate'
import { TaskRowActions } from './TaskRowActions'

type Props = {
  tasks: Task[]
  projects: Project[]
}

const columnHelper = createDataTableColumnHelper<Task>()

export function TasksTable({ tasks, projects }: Props) {
  const t = useTranslations('general.tasks.table')
  const messagesT = useTranslations('general.tasks.messages')

  const router = useRouter()

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

          cell: ({ row, getValue }) => {
            const status = getValue()

            const styles = {
              todo: 'bg-muted text-muted-foreground hover:bg-muted/80',
              in_progress:
                'bg-blue-500/40 text-blue-800 hover:bg-blue-500/45! dark:text-blue-200',
              done: 'bg-emerald-500/40 text-emerald-800 hover:bg-emerald-500/45! dark:text-emerald-200',
            }

            return (
              <EditableSelectCell
                value={status}
                ariaLabel={t('inline.statusAriaLabel', {
                  task: row.original.title,
                })}
                options={[
                  {
                    value: 'todo',
                    label: t('status.todo'),
                  },
                  {
                    value: 'in_progress',
                    label: t('status.inProgress'),
                  },
                  {
                    value: 'done',
                    label: t('status.done'),
                  },
                ]}
                className={`h-6! w-fit min-w-32 border-transparent px-2! font-medium [&_svg]:text-current [&_svg]:opacity-100 ${styles[status]}`}
                onSave={async (value) => {
                  const result = await updateTaskInline(row.original.id, {
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

          cell: ({ row, getValue }) => {
            const priority = getValue()

            const styles = {
              low: 'bg-muted text-muted-foreground hover:bg-muted/80',
              medium:
                'bg-amber-500/40 text-amber-800 hover:bg-amber-500/45! dark:text-amber-200',
              high: 'bg-red-500/40 text-red-800 hover:bg-red-500/45! dark:text-red-200',
            }

            return (
              <EditableSelectCell
                value={priority}
                ariaLabel={t('inline.priorityAriaLabel', {
                  task: row.original.title,
                })}
                options={[
                  {
                    value: 'low',
                    label: t('priority.low'),
                  },
                  {
                    value: 'medium',
                    label: t('priority.medium'),
                  },
                  {
                    value: 'high',
                    label: t('priority.high'),
                  },
                ]}
                className={`h-6! w-fit min-w-28 border-transparent px-2! font-medium [&_svg]:text-current [&_svg]:opacity-100 ${styles[priority]}`}
                onSave={async (value) => {
                  const result = await updateTaskInline(row.original.id, {
                    field: 'priority',
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

          cell: ({ row }) => (
            <TaskDueDate dueDate={row.original.due_date} status={row.original.status} />
          ),

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
    [messagesT, projects, router, t],
  )

  if (tasks.length === 0) {
    const hasProjects = projects.length > 0

    return (
      <EmptyState
        icon={<ListTodo aria-hidden="true" className="size-6" />}
        title={hasProjects ? t('empty.title') : t('empty.noProjectsTitle')}
        description={
          hasProjects ? t('empty.description') : t('empty.noProjectsDescription')
        }
        action={
          hasProjects ? (
            <NewTaskSheet projects={projects} />
          ) : (
            <Link href="/projects" className={buttonVariants()}>
              {t('empty.goToProjects')}
              <ArrowRight aria-hidden="true" />
            </Link>
          )
        }
        className="min-h-80"
      />
    )
  }

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
