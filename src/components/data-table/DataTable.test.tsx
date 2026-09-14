import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/render'

import { createDataTableColumnHelper } from './data-table-features'
import { DataTable } from './DataTable'
import { DataTableColumnHeader } from './DataTableColumnHeader'

type Person = {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
}

const people: Person[] = [
  {
    id: '1',
    name: 'Charlie',
    email: 'charlie@example.com',
    status: 'active',
  },
  {
    id: '2',
    name: 'Alice',
    email: 'alice@example.com',
    status: 'inactive',
  },
  {
    id: '3',
    name: 'Bob',
    email: 'bob@example.com',
    status: 'active',
  },
]

const columnHelper = createDataTableColumnHelper<Person>()

const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    enableGlobalFilter: true,

    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,

    cell: ({ getValue }) => <span data-testid="name-cell">{getValue()}</span>,

    meta: {
      label: 'Name',
    },
  }),

  columnHelper.accessor('email', {
    enableGlobalFilter: true,

    header: 'Email',

    cell: ({ getValue }) => getValue(),

    meta: {
      label: 'Email',
    },
  }),

  columnHelper.accessor('status', {
    enableGlobalFilter: false,

    header: 'Status',

    cell: ({ getValue }) => getValue(),

    meta: {
      label: 'Status',

      filter: {
        type: 'select',
        label: 'Filter by status',
        placeholder: 'Status',
        options: [
          {
            label: 'Active',
            value: 'active',
          },
          {
            label: 'Inactive',
            value: 'inactive',
          },
        ],
      },
    },

    filterFn: 'equalsString',
  }),
])

function getRenderedNames() {
  return screen.getAllByTestId('name-cell').map((cell) => cell.textContent)
}

describe('DataTable', () => {
  it('renders the provided rows', () => {
    renderWithProviders(
      <DataTable data={people} columns={columns} getRowId={(row) => row.id} />,
    )

    expect(screen.getByText('Charlie')).toBeInTheDocument()

    expect(screen.getByText('Alice')).toBeInTheDocument()

    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('sorts rows by a sortable column', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DataTable data={people} columns={columns} getRowId={(row) => row.id} />,
    )

    expect(getRenderedNames()).toEqual(['Charlie', 'Alice', 'Bob'])

    await user.click(
      screen.getByRole('button', {
        name: 'Name',
      }),
    )

    expect(getRenderedNames()).toEqual(['Alice', 'Bob', 'Charlie'])

    await user.click(
      screen.getByRole('button', {
        name: 'Name',
      }),
    )

    expect(getRenderedNames()).toEqual(['Charlie', 'Bob', 'Alice'])
  })

  it('filters rows with global search', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DataTable data={people} columns={columns} getRowId={(row) => row.id} />,
    )

    await user.type(screen.getByPlaceholderText('Search...'), 'alice')

    expect(screen.getByText('Alice')).toBeInTheDocument()

    expect(screen.queryByText('Charlie')).not.toBeInTheDocument()

    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
  })

  it('paginates rows', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DataTable
        data={people}
        columns={columns}
        pageSize={2}
        getRowId={(row) => row.id}
      />,
    )

    expect(screen.getByText('Charlie')).toBeInTheDocument()

    expect(screen.getByText('Alice')).toBeInTheDocument()

    expect(screen.queryByText('Bob')).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Next page',
      }),
    )

    expect(screen.getByText('Bob')).toBeInTheDocument()

    expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
  })

  it('selects rows and exposes them to bulk actions', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DataTable
        data={people}
        columns={columns}
        enableRowSelection
        getRowId={(row) => row.id}
        renderBulkActions={({ selectedCount }) => (
          <span data-testid="bulk-count">{selectedCount}</span>
        )}
      />,
    )

    const checkboxes = screen.getAllByRole('checkbox')

    await user.click(checkboxes[1])

    expect(screen.getByTestId('bulk-count')).toHaveTextContent('1')

    expect(screen.getByText('1 row selected')).toBeInTheDocument()
  })

  it('selects rows across client-side pages', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DataTable
        data={people}
        columns={columns}
        enableRowSelection
        pageSize={2}
        getRowId={(row) => row.id}
        renderBulkActions={({ selectedCount }) => (
          <span data-testid="bulk-count">{selectedCount}</span>
        )}
      />,
    )

    let checkboxes = screen.getAllByRole('checkbox')

    await user.click(checkboxes[1])

    await user.click(
      screen.getByRole('button', {
        name: 'Next page',
      }),
    )

    checkboxes = screen.getAllByRole('checkbox')

    await user.click(checkboxes[1])

    expect(screen.getByTestId('bulk-count')).toHaveTextContent('2')
  })

  it('shows an empty state outside the scrollable table when no rows match', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DataTable data={people} columns={columns} getRowId={(row) => row.id} />,
    )

    await user.type(screen.getByPlaceholderText('Search...'), 'does-not-exist')

    const table = screen.getByRole('table')

    expect(screen.getByText('No results.')).toBeInTheDocument()

    expect(
      screen.getByText(
        "Try adjusting your search or filters to find what you're looking for.",
      ),
    ).toBeInTheDocument()

    expect(within(table).queryByText('No results.')).not.toBeInTheDocument()

    expect(screen.queryAllByTestId('name-cell')).toHaveLength(0)
  })

  it('resizes a column with the keyboard', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DataTable data={people} columns={columns} getRowId={(row) => row.id} />,
    )

    const resizeHandle = screen.getByRole('separator', {
      name: 'Resize Name column',
    })

    const header = resizeHandle.closest('th')

    expect(header).not.toBeNull()

    expect(header).toHaveStyle({
      width: '180px',
    })

    resizeHandle.focus()

    await user.keyboard('{ArrowRight}')

    expect(header).toHaveStyle({
      width: '196px',
    })

    await user.keyboard('{Home}')

    expect(header).toHaveStyle({
      width: '80px',
    })

    await user.keyboard('{Enter}')

    expect(header).toHaveStyle({
      width: '180px',
    })
  })
})
