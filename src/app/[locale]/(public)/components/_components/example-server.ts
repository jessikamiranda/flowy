import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'

import { normalizeSearchText } from '@/lib/text'

import type { ExampleTableRow } from './example-data'

type Params = {
  rows: ExampleTableRow[]

  globalFilter: string
  columnFilters: ColumnFiltersState

  pagination: PaginationState
  sorting: SortingState
}

function compareValues(first: unknown, second: unknown) {
  if (first === second) {
    return 0
  }

  if (first === null || first === undefined) {
    return 1
  }

  if (second === null || second === undefined) {
    return -1
  }

  if (first instanceof Date && second instanceof Date) {
    return first.getTime() - second.getTime()
  }

  if (typeof first === 'number' && typeof second === 'number') {
    return first - second
  }

  return String(first).localeCompare(String(second))
}

export function getExampleServerResult({
  rows,
  globalFilter,
  columnFilters,
  pagination,
  sorting,
}: Params) {
  const totalRowCount = rows.length

  let result = [...rows]

  const search = normalizeSearchText(globalFilter)

  if (search) {
    result = result.filter((row) => {
      return (
        normalizeSearchText(row.name).includes(search) ||
        normalizeSearchText(row.email).includes(search)
      )
    })
  }

  for (const filter of columnFilters) {
    if (filter.id === 'email') {
      const value = normalizeSearchText(String(filter.value))

      result = result.filter((row) => normalizeSearchText(row.email).includes(value))
    }

    if (filter.id === 'status') {
      const value = String(filter.value)

      result = result.filter((row) => row.status === value)
    }
  }

  const activeSort = sorting[0]

  if (activeSort) {
    result.sort((first, second) => {
      const firstValue = first[activeSort.id as keyof ExampleTableRow]

      const secondValue = second[activeSort.id as keyof ExampleTableRow]

      const comparison = compareValues(firstValue, secondValue)

      return activeSort.desc ? -comparison : comparison
    })
  }

  const rowCount = result.length

  const start = pagination.pageIndex * pagination.pageSize

  const end = start + pagination.pageSize

  return {
    rows: result.slice(start, end),
    rowCount,
    totalRowCount,
  }
}
