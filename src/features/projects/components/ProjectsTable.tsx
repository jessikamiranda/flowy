'use client'

import { ArrowRight, FolderKanban } from 'lucide-react'
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
import { buttonVariants } from '@/components/ui/button'
import type { Client } from '@/features/clients/types/client'
import { Link, useRouter } from '@/i18n/navigation'

import { updateProjectInline } from '../actions/updateProjectInline'
import type { Project } from '../types/project'
import { NewProjectSheet } from './NewProjectSheet'
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

  const messagesT = useTranslations('general.projects.messages')
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

          size: 260,
          minSize: 220,
          maxSize: 420,

          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t('columns.project')} />
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

                {row.original.description && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {row.original.description}
                  </p>
                )}
              </div>
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

              <p className="text-xs text-muted-foreground">{row.original.client.name}</p>
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

          cell: ({ row, getValue }) => {
            const status = getValue()

            const styles = {
              planning:
                'bg-violet-500/40! text-violet-800 hover:bg-violet-500/45! dark:text-violet-200',
              in_progress:
                'bg-blue-500/40! text-blue-800 hover:bg-blue-500/45! dark:text-blue-200',
              on_hold:
                'bg-amber-500/40! text-amber-800 hover:bg-amber-500/45! dark:text-amber-200',
              completed:
                'bg-emerald-500/40! text-emerald-800 hover:bg-emerald-500/45! dark:text-emerald-200',
            }

            return (
              <EditableSelectCell
                value={status}
                ariaLabel={t('inline.statusAriaLabel', {
                  project: row.original.name,
                })}
                options={[
                  {
                    value: 'planning',
                    label: t('status.planning'),
                  },
                  {
                    value: 'in_progress',
                    label: t('status.inProgress'),
                  },
                  {
                    value: 'on_hold',
                    label: t('status.onHold'),
                  },
                  {
                    value: 'completed',
                    label: t('status.completed'),
                  },
                ]}
                className={`h-6! w-fit min-w-32 border-transparent px-2! font-medium [&_svg]:text-current [&_svg]:opacity-100 ${styles[status]}`}
                onSave={async (value) => {
                  const result = await updateProjectInline(row.original.id, {
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

          cell: ({ row, getValue }) => {
            const priority = getValue()

            const styles = {
              low: 'bg-muted! text-muted-foreground hover:bg-muted/80',
              medium:
                'bg-amber-500/40! text-amber-800 hover:bg-amber-500/45! dark:text-amber-200',
              high: 'bg-red-500/40! text-red-800 hover:bg-red-500/45! dark:text-red-200',
            }

            return (
              <EditableSelectCell
                value={priority}
                ariaLabel={t('inline.priorityAriaLabel', {
                  project: row.original.name,
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
                  const result = await updateProjectInline(row.original.id, {
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
    [clients, dateFormatter, messagesT, router, t],
  )

  if (projects.length === 0) {
    const hasClients = clients.length > 0

    return (
      <EmptyState
        icon={<FolderKanban aria-hidden="true" className="size-6" />}
        title={hasClients ? t('empty.title') : t('empty.noClientsTitle')}
        description={
          hasClients ? t('empty.description') : t('empty.noClientsDescription')
        }
        action={
          hasClients ? (
            <NewProjectSheet clients={clients} />
          ) : (
            <Link href="/clients" className={buttonVariants()}>
              {t('empty.goToClients')}
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
      data={projects}
      columns={columns}
      getRowId={(project) => project.id}
      searchPlaceholder={t('searchPlaceholder')}
      pageSize={10}
    />
  )
}
