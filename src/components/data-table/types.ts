export type DataTableBulkActionsContext<TData> = {
  selectedRows: TData[]
  selectedRowIds: string[]
  selectedCount: number
  clearSelection: () => void
}
