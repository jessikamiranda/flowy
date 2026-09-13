'use client'

import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef } from 'react'

export type DataTableQueryFilter = {
  columnId: string
  queryKey?: string

  parse?: (value: string) => unknown
  serialize?: (value: unknown) => string | null
}

export type DataTableQueryPagination = {
  pageQueryKey?: string
  pageSizeQueryKey?: string
  defaultPageSize?: number
}

export type DataTableQuerySorting = {
  sortQueryKey?: string
  orderQueryKey?: string
}

type Options = {
  globalFilterQueryKey?: string
  filters?: DataTableQueryFilter[]

  pagination?: DataTableQueryPagination
  sorting?: DataTableQuerySorting
}

const EMPTY_FILTERS: DataTableQueryFilter[] = []

function serializeDefault(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return String(value)
}

export function useDataTableQueryState({
  globalFilterQueryKey = 'q',
  filters = EMPTY_FILTERS,
  pagination: paginationOptions,
  sorting: sortingOptions,
}: Options = {}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const paginationEnabled = paginationOptions !== undefined

  const sortingEnabled = sortingOptions !== undefined

  const pageQueryKey = paginationOptions?.pageQueryKey ?? 'page'

  const pageSizeQueryKey = paginationOptions?.pageSizeQueryKey ?? 'pageSize'

  const defaultPageSize = paginationOptions?.defaultPageSize ?? 10

  const sortQueryKey = sortingOptions?.sortQueryKey ?? 'sort'

  const orderQueryKey = sortingOptions?.orderQueryKey ?? 'order'

  const globalFilter = searchParams.get(globalFilterQueryKey) ?? ''

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    return filters.flatMap((filter) => {
      const queryKey = filter.queryKey ?? filter.columnId

      const rawValue = searchParams.get(queryKey)

      if (rawValue === null || rawValue === '') {
        return []
      }

      const value = filter.parse ? filter.parse(rawValue) : rawValue

      if (value === null || value === undefined) {
        return []
      }

      return [
        {
          id: filter.columnId,
          value,
        },
      ]
    })
  }, [filters, searchParams])

  const pagination = useMemo<PaginationState>(() => {
    const rawPage = searchParams.get(pageQueryKey)

    const rawPageSize = searchParams.get(pageSizeQueryKey)

    const parsedPage = rawPage ? Number.parseInt(rawPage, 10) : 1

    const parsedPageSize = rawPageSize
      ? Number.parseInt(rawPageSize, 10)
      : defaultPageSize

    return {
      pageIndex: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage - 1 : 0,

      pageSize:
        Number.isFinite(parsedPageSize) && parsedPageSize > 0
          ? parsedPageSize
          : defaultPageSize,
    }
  }, [defaultPageSize, pageQueryKey, pageSizeQueryKey, searchParams])

  const sorting = useMemo<SortingState>(() => {
    const columnId = searchParams.get(sortQueryKey)

    if (!columnId) {
      return []
    }

    const order = searchParams.get(orderQueryKey)

    return [
      {
        id: columnId,
        desc: order === 'desc',
      },
    ]
  }, [orderQueryKey, searchParams, sortQueryKey])

  const globalFilterRef = useRef(globalFilter)

  const columnFiltersRef = useRef<ColumnFiltersState>(columnFilters)

  const paginationRef = useRef<PaginationState>(pagination)

  const sortingRef = useRef<SortingState>(sorting)

  useEffect(() => {
    globalFilterRef.current = globalFilter
  }, [globalFilter])

  useEffect(() => {
    columnFiltersRef.current = columnFilters
  }, [columnFilters])

  useEffect(() => {
    paginationRef.current = pagination
  }, [pagination])

  useEffect(() => {
    sortingRef.current = sorting
  }, [sorting])

  const syncUrl = useCallback(
    (
      nextGlobalFilter: string,
      nextColumnFilters: ColumnFiltersState,
      nextPagination: PaginationState,
      nextSorting: SortingState,
    ) => {
      const params = new URLSearchParams(searchParams.toString())

      if (nextGlobalFilter) {
        params.set(globalFilterQueryKey, nextGlobalFilter)
      } else {
        params.delete(globalFilterQueryKey)
      }

      for (const filter of filters) {
        const queryKey = filter.queryKey ?? filter.columnId

        const activeFilter = nextColumnFilters.find((item) => item.id === filter.columnId)

        if (!activeFilter) {
          params.delete(queryKey)
          continue
        }

        const serializedValue = filter.serialize
          ? filter.serialize(activeFilter.value)
          : serializeDefault(activeFilter.value)

        if (serializedValue === null) {
          params.delete(queryKey)
          continue
        }

        params.set(queryKey, serializedValue)
      }

      if (paginationEnabled) {
        if (nextPagination.pageIndex > 0) {
          params.set(pageQueryKey, String(nextPagination.pageIndex + 1))
        } else {
          params.delete(pageQueryKey)
        }

        if (nextPagination.pageSize !== defaultPageSize) {
          params.set(pageSizeQueryKey, String(nextPagination.pageSize))
        } else {
          params.delete(pageSizeQueryKey)
        }
      }

      if (sortingEnabled) {
        const activeSort = nextSorting[0]

        if (activeSort) {
          params.set(sortQueryKey, activeSort.id)

          params.set(orderQueryKey, activeSort.desc ? 'desc' : 'asc')
        } else {
          params.delete(sortQueryKey)
          params.delete(orderQueryKey)
        }
      }

      const query = params.toString()

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [
      defaultPageSize,
      filters,
      globalFilterQueryKey,
      orderQueryKey,
      pageQueryKey,
      pageSizeQueryKey,
      paginationEnabled,
      pathname,
      router,
      searchParams,
      sortQueryKey,
      sortingEnabled,
    ],
  )

  const onGlobalFilterChange = useCallback<OnChangeFn<string>>(
    (updater) => {
      const nextGlobalFilter =
        typeof updater === 'function' ? updater(globalFilterRef.current) : updater

      const nextPagination = paginationEnabled
        ? {
            ...paginationRef.current,
            pageIndex: 0,
          }
        : paginationRef.current

      globalFilterRef.current = nextGlobalFilter

      paginationRef.current = nextPagination

      syncUrl(
        nextGlobalFilter,
        columnFiltersRef.current,
        nextPagination,
        sortingRef.current,
      )
    },
    [paginationEnabled, syncUrl],
  )

  const onColumnFiltersChange = useCallback<OnChangeFn<ColumnFiltersState>>(
    (updater) => {
      const nextColumnFilters =
        typeof updater === 'function' ? updater(columnFiltersRef.current) : updater

      const nextPagination = paginationEnabled
        ? {
            ...paginationRef.current,
            pageIndex: 0,
          }
        : paginationRef.current

      columnFiltersRef.current = nextColumnFilters

      paginationRef.current = nextPagination

      syncUrl(
        globalFilterRef.current,
        nextColumnFilters,
        nextPagination,
        sortingRef.current,
      )
    },
    [paginationEnabled, syncUrl],
  )

  const onPaginationChange = useCallback<OnChangeFn<PaginationState>>(
    (updater) => {
      const nextPagination =
        typeof updater === 'function' ? updater(paginationRef.current) : updater

      paginationRef.current = nextPagination

      syncUrl(
        globalFilterRef.current,
        columnFiltersRef.current,
        nextPagination,
        sortingRef.current,
      )
    },
    [syncUrl],
  )

  const onSortingChange = useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      const nextSorting =
        typeof updater === 'function' ? updater(sortingRef.current) : updater

      const nextPagination = paginationEnabled
        ? {
            ...paginationRef.current,
            pageIndex: 0,
          }
        : paginationRef.current

      sortingRef.current = nextSorting

      paginationRef.current = nextPagination

      syncUrl(
        globalFilterRef.current,
        columnFiltersRef.current,
        nextPagination,
        nextSorting,
      )
    },
    [paginationEnabled, syncUrl],
  )

  return {
    globalFilter,
    columnFilters,

    onGlobalFilterChange,
    onColumnFiltersChange,

    pagination: paginationEnabled ? pagination : undefined,

    onPaginationChange: paginationEnabled ? onPaginationChange : undefined,

    sorting: sortingEnabled ? sorting : undefined,

    onSortingChange: sortingEnabled ? onSortingChange : undefined,
  }
}
