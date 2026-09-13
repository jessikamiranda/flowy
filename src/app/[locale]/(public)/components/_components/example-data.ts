export type ExampleTableStatus = 'active' | 'pending' | 'inactive'

export type ExampleTableRow = {
  id: string
  name: string
  email: string
  status: ExampleTableStatus
  budget: number | null
  createdAt: Date
}

export type ExampleTableRowUpdate = Partial<Omit<ExampleTableRow, 'id'>>

export type UpdateExampleTableRow = (
  id: string,
  values: ExampleTableRowUpdate,
) => void | Promise<void>

export const exampleTableRows: ExampleTableRow[] = [
  {
    id: '1',
    name: 'Olivia Martin',
    email: 'olivia@example.com',
    status: 'active',
    budget: 12500,
    createdAt: new Date(2026, 0, 12),
  },
  {
    id: '2',
    name: 'Jackson Lee',
    email: 'jackson@example.com',
    status: 'pending',
    budget: 8200,
    createdAt: new Date(2026, 1, 3),
  },
  {
    id: '3',
    name: 'Sofia Davis',
    email: 'sofia@example.com',
    status: 'active',
    budget: 18750,
    createdAt: new Date(2026, 2, 21),
  },
  {
    id: '4',
    name: 'Noah Williams',
    email: 'noah@example.com',
    status: 'inactive',
    budget: null,
    createdAt: new Date(2026, 3, 8),
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    status: 'active',
    budget: 24100,
    createdAt: new Date(2026, 4, 17),
  },
  {
    id: '6',
    name: 'Liam Brown',
    email: 'liam@example.com',
    status: 'pending',
    budget: 9500,
    createdAt: new Date(2026, 5, 4),
  },
  {
    id: '7',
    name: 'Mia Anderson',
    email: 'mia@example.com',
    status: 'active',
    budget: 15300,
    createdAt: new Date(2026, 6, 26),
  },
  {
    id: '8',
    name: 'Lucas Taylor',
    email: 'lucas@example.com',
    status: 'inactive',
    budget: 6700,
    createdAt: new Date(2026, 7, 14),
  },
]
