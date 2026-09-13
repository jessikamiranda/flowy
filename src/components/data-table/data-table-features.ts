import {
  type ColumnDef,
  columnFilteringFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equalsString,
  filterFn_includesString,
  globalFilteringFeature,
  metaHelper,
  type RowData,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from '@tanstack/react-table'

export type DataTableFilterOption = {
  label: string
  value: string
}

export type DataTableColumnFilterConfig =
  | {
      type: 'text'
      label: string
      placeholder?: string
    }
  | {
      type: 'select'
      label: string
      placeholder?: string
      options: DataTableFilterOption[]
    }

export type DataTableColumnMeta = {
  label?: string
  filter?: DataTableColumnFilterConfig
}

export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,

  rowSelectionFeature,

  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),

  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),

  columnVisibilityFeature,

  columnSizingFeature,
  columnResizingFeature,

  filteredRowModel: createFilteredRowModel(),

  filterFns: {
    includesString: filterFn_includesString,
    equalsString: filterFn_equalsString,
  },

  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },

  columnMeta: metaHelper<DataTableColumnMeta>(),
})

export type DataTableFeatures = typeof dataTableFeatures

export type DataTableColumnDef<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData
>

export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>()
}
