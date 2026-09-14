'use client'

import {
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  useTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type ReactNode, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  type DataTableColumnDef,
  type DataTableFeatures,
  dataTableFeatures,
} from './data-table-features'
import { DataTableBulkActions } from './DataTableBulkActions'
import { DataTableToolbar } from './DataTableToolbar'
import { type DataTableBulkActionsContext } from './types'

type DataTableProps<TData extends RowData> = {
  columns: DataTableColumnDef<TData>[]
  data: TData[]

  enableRowSelection?: boolean
  enableColumnResizing?: boolean
  enableColumnVisibility?: boolean
  enableGlobalSearch?: boolean

  searchPlaceholder?: string
  pageSize?: number

  getRowId?: TableOptions<DataTableFeatures, TData>['getRowId']

  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>

  globalFilter?: string
  onGlobalFilterChange?: OnChangeFn<string>

  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>

  renderBulkActions?: (context: DataTableBulkActionsContext<TData>) => ReactNode

  mode?: 'client' | 'server'

  rowCount?: number
  totalRowCount?: number

  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>

  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
}

export function DataTable<TData extends RowData>({
  columns,
  data,

  mode = 'client',
  rowCount,
  totalRowCount,

  enableRowSelection = false,
  enableColumnResizing = true,
  enableColumnVisibility = true,
  enableGlobalSearch = true,

  searchPlaceholder,
  pageSize = 10,

  getRowId,

  rowSelection,
  onRowSelectionChange,

  globalFilter,
  onGlobalFilterChange,

  columnFilters,
  onColumnFiltersChange,

  pagination: controlledPagination,
  onPaginationChange: controlledOnPaginationChange,

  sorting: controlledSorting,
  onSortingChange: controlledOnSortingChange,

  renderBulkActions,
}: DataTableProps<TData>) {
  const t = useTranslations('general.dataTable')

  const [internalSorting, setInternalSorting] = useState<SortingState>([])

  const currentSorting = controlledSorting ?? internalSorting

  const handleSortingChange = controlledOnSortingChange ?? setInternalSorting

  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({})

  const [internalPagination, setInternalPagination] = useState<PaginationState>(() => ({
    pageIndex: 0,
    pageSize,
  }))

  const currentPagination = controlledPagination ?? internalPagination

  const handlePaginationChange = controlledOnPaginationChange ?? setInternalPagination

  const currentRowSelection = rowSelection ?? internalRowSelection

  const handleRowSelectionChange = onRowSelectionChange ?? setInternalRowSelection

  const isServerSide = mode === 'server'

  const tableColumns = useMemo<DataTableColumnDef<TData>[]>(() => {
    if (!enableRowSelection) {
      return columns
    }

    const selectionColumn: DataTableColumnDef<TData> = {
      id: 'select',

      size: 48,
      minSize: 48,
      maxSize: 48,

      enableSorting: false,
      enableHiding: false,
      enableResizing: false,

      header: ({ table }) => {
        const allSelected = table.getIsAllPageRowsSelected()
        const someSelected = table.getIsSomePageRowsSelected()

        return (
          <div className="flex justify-center">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onCheckedChange={(checked) => {
                table.toggleAllPageRowsSelected(!!checked)
              }}
              aria-label={t('selectAllRows')}
            />
          </div>
        )
      },

      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => {
              row.toggleSelected(!!checked)
            }}
            aria-label={t('selectRow')}
          />
        </div>
      ),
    }

    return [selectionColumn, ...columns]
  }, [columns, enableRowSelection, t])

  const table = useTable({
    features: dataTableFeatures,

    data,
    columns: tableColumns,

    globalFilterFn: 'includesString',

    state: {
      sorting: currentSorting,
      pagination: currentPagination,
      rowSelection: currentRowSelection,

      ...(globalFilter !== undefined
        ? {
            globalFilter,
          }
        : {}),

      ...(columnFilters !== undefined
        ? {
            columnFilters,
          }
        : {}),
    },

    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: handleRowSelectionChange,

    ...(onGlobalFilterChange
      ? {
          onGlobalFilterChange,
        }
      : {}),

    ...(onColumnFiltersChange
      ? {
          onColumnFiltersChange,
        }
      : {}),

    manualFiltering: isServerSide,
    manualSorting: isServerSide,
    manualPagination: isServerSide,

    enableMultiSort: false,

    enableRowSelection,
    enableColumnResizing,

    columnResizeMode: 'onChange',

    defaultColumn: {
      size: 180,
      minSize: 80,
      maxSize: 600,
    },

    getRowId,

    ...(isServerSide && rowCount !== undefined
      ? {
          rowCount,
        }
      : {}),
  })

  const rows = table.getRowModel().rows

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)

  const selectedRowIds = table.getSelectedRowIds()

  const selectedCount = selectedRowIds.length

  const hasActiveFilters =
    String(table.state.globalFilter ?? '').length > 0 ||
    table.state.columnFilters.length > 0

  const filteredRowCount = isServerSide
    ? (rowCount ?? data.length)
    : table.getFilteredRowModel().rows.length

  const overallRowCount = isServerSide ? (totalRowCount ?? filteredRowCount) : data.length

  const firstVisibleRow =
    filteredRowCount === 0
      ? 0
      : currentPagination.pageIndex * currentPagination.pageSize + 1

  const lastVisibleRow =
    filteredRowCount === 0
      ? 0
      : Math.min(firstVisibleRow + rows.length - 1, filteredRowCount)

  return (
    <div className="space-y-3">
      <DataTableToolbar
        table={table}
        enableGlobalSearch={enableGlobalSearch}
        enableColumnVisibility={enableColumnVisibility}
        searchPlaceholder={searchPlaceholder}
      />

      {renderBulkActions && selectedCount > 0 && (
        <DataTableBulkActions
          selectedCount={selectedCount}
          onClear={() => {
            table.resetRowSelection(true)
          }}
        >
          {renderBulkActions({
            selectedRows,
            selectedRowIds,
            selectedCount,
            clearSelection: () => {
              table.resetRowSelection(true)
            },
          })}
        </DataTableBulkActions>
      )}

      <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/90">
        <Table
          className="table-fixed"
          style={{
            width: table.getTotalSize(),
            minWidth: '100%',
          }}
        >
          <TableHeader className="bg-muted/35">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/60 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  const columnLabel =
                    header.column.columnDef.meta?.label ?? header.column.id

                  const minSize = header.column.columnDef.minSize ?? 80

                  const maxSize = header.column.columnDef.maxSize ?? 600

                  const resizeStep = 16

                  function setColumnSize(size: number) {
                    const nextSize = Math.min(maxSize, Math.max(minSize, size))

                    table.setColumnSizing((current) => ({
                      ...current,
                      [header.column.id]: nextSize,
                    }))
                  }

                  return (
                    <TableHead
                      key={header.id}
                      className="group relative h-11 px-4"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}

                      {header.column.getCanResize() && (
                        <div
                          role="separator"
                          tabIndex={0}
                          aria-orientation="vertical"
                          aria-label={t('resizeColumn', {
                            column: columnLabel,
                          })}
                          aria-valuemin={minSize}
                          aria-valuemax={maxSize}
                          aria-valuenow={header.column.getSize()}
                          onDoubleClick={() => {
                            header.column.resetSize()
                          }}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          onKeyDown={(event) => {
                            const currentSize = header.column.getSize()

                            if (event.key === 'ArrowLeft') {
                              event.preventDefault()

                              setColumnSize(currentSize - resizeStep)
                            }

                            if (event.key === 'ArrowRight') {
                              event.preventDefault()

                              setColumnSize(currentSize + resizeStep)
                            }

                            if (event.key === 'Home') {
                              event.preventDefault()

                              setColumnSize(minSize)
                            }

                            if (event.key === 'End') {
                              event.preventDefault()

                              setColumnSize(maxSize)
                            }

                            if (event.key === 'Enter') {
                              event.preventDefault()

                              header.column.resetSize()
                            }
                          }}
                          className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize touch-none select-none bg-primary/35 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                className="group/row border-border/50 transition-colors hover:bg-muted/35 data-[state=selected]:bg-accent/55"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="overflow-hidden px-4 py-3.5"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {rows.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center border-t border-border/60 px-6 py-14 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary">
              <SearchX aria-hidden="true" className="size-5" />
            </div>

            <p className="mt-5 text-lg font-semibold tracking-[-0.025em]">
              {t('noResults')}
            </p>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {t('noResultsDescription')}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-1 pt-1">
        <div className="flex min-w-0 flex-col gap-1 text-xs text-muted-foreground">
          <span>
            {hasActiveFilters
              ? t('filteredRecordsSummary', {
                  start: firstVisibleRow,
                  end: lastVisibleRow,
                  filtered: filteredRowCount,
                  total: overallRowCount,
                })
              : t('recordsSummary', {
                  start: firstVisibleRow,
                  end: lastVisibleRow,
                  count: overallRowCount,
                })}
          </span>

          {enableRowSelection && selectedCount > 0 && !renderBulkActions && (
            <span aria-live="polite">
              {t('selectedForActions', {
                count: selectedCount,
              })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            aria-label={t('previousPage')}
            className="rounded-xl border border-border/60 bg-card/70 shadow-none hover:bg-card"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>

          <span className="min-w-14 text-center text-xs font-medium text-muted-foreground">
            {table.state.pagination.pageIndex + 1} / {Math.max(table.getPageCount(), 1)}
          </span>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            aria-label={t('nextPage')}
            className="rounded-xl border border-border/60 bg-card/70 shadow-none hover:bg-card"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
