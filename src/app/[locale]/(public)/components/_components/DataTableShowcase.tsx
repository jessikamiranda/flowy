'use client'

import { type PaginationState, type SortingState } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'

import {
  DataTable,
  type DataTableQueryFilter,
  useDataTableQueryState,
} from '@/components/data-table'
import { Button } from '@/components/ui/button'

import { ComponentSection } from './ComponentSection'
import {
  type ExampleTableRow,
  exampleTableRows,
  type ExampleTableStatus,
  type UpdateExampleTableRow,
} from './example-data'
import { getExampleServerResult } from './example-server'
import { useExampleColumns } from './useExampleColumns'

const DEFAULT_PAGE_SIZE = 5

const DEFAULT_PAGINATION: PaginationState = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
}

const EMPTY_SORTING: SortingState = []

const queryFilters = [
  {
    columnId: 'email',
    queryKey: 'email',
  },
  {
    columnId: 'status',
    queryKey: 'status',
  },
] satisfies DataTableQueryFilter[]

export function DataTableShowcase() {
  const t = useTranslations('general.showcase.dataTable')

  const queryState = useDataTableQueryState({
    globalFilterQueryKey: 'q',

    filters: queryFilters,

    pagination: {
      pageQueryKey: 'page',
      pageSizeQueryKey: 'pageSize',
      defaultPageSize: DEFAULT_PAGE_SIZE,
    },

    sorting: {
      sortQueryKey: 'sort',
      orderQueryKey: 'order',
    },
  })

  const [data, setData] = useState<ExampleTableRow[]>(() => exampleTableRows)

  const pagination = queryState.pagination ?? DEFAULT_PAGINATION

  const sorting = queryState.sorting ?? EMPTY_SORTING

  const serverResult = useMemo(
    () =>
      getExampleServerResult({
        rows: data,

        globalFilter: queryState.globalFilter,

        columnFilters: queryState.columnFilters,

        pagination,
        sorting,
      }),
    [data, pagination, queryState.columnFilters, queryState.globalFilter, sorting],
  )

  const handleUpdate = useCallback<UpdateExampleTableRow>((id, values) => {
    setData((currentData) =>
      currentData.map((row) =>
        row.id === id
          ? {
              ...row,
              ...values,
            }
          : row,
      ),
    )
  }, [])

  const handleBulkStatusChange = useCallback(
    (selectedRowIds: string[], status: ExampleTableStatus) => {
      const selectedIds = new Set(selectedRowIds)

      setData((currentData) =>
        currentData.map((row) =>
          selectedIds.has(row.id)
            ? {
                ...row,
                status,
              }
            : row,
        ),
      )
    },
    [],
  )

  const columns = useExampleColumns({
    onUpdate: handleUpdate,
  })

  return (
    <ComponentSection title={t('title')} description={t('description')}>
      <DataTable
        data={serverResult.rows}
        mode="server"
        rowCount={serverResult.rowCount}
        totalRowCount={serverResult.totalRowCount}
        columns={columns}
        enableRowSelection
        getRowId={(row) => row.id}
        searchPlaceholder={t('searchPlaceholder')}
        renderBulkActions={({ selectedRowIds, clearSelection }) => (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                handleBulkStatusChange(selectedRowIds, 'active')

                clearSelection()
              }}
            >
              {t('bulkActions.setActive')}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                handleBulkStatusChange(selectedRowIds, 'inactive')

                clearSelection()
              }}
            >
              {t('bulkActions.setInactive')}
            </Button>
          </>
        )}
        {...queryState}
      />
    </ComponentSection>
  )
}
