import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '@/test/render'

import { FilterBar } from './FilterBar'
import { SearchInput } from './SearchInput'
import { SelectFilter } from './SelectFilter'

describe('filters', () => {
  it('updates the search value', async () => {
    const user = userEvent.setup()

    const onValueChange = vi.fn()

    renderWithProviders(
      <SearchInput
        value=""
        aria-label="Search projects"
        placeholder="Search..."
        onValueChange={onValueChange}
      />,
    )

    await user.type(
      screen.getByRole('searchbox', {
        name: 'Search projects',
      }),
      'a',
    )

    expect(onValueChange).toHaveBeenCalledWith('a')
  })

  it('clears the search value', async () => {
    const user = userEvent.setup()

    const onValueChange = vi.fn()

    renderWithProviders(
      <SearchInput
        value="acme"
        aria-label="Search projects"
        onValueChange={onValueChange}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Clear search',
      }),
    )

    expect(onValueChange).toHaveBeenCalledWith('')
  })

  it('renders the selected filter label', () => {
    renderWithProviders(
      <SelectFilter
        label="Filter by status"
        placeholder="Status"
        value="active"
        options={[
          {
            label: 'Active',
            value: 'active',
          },
          {
            label: 'Inactive',
            value: 'inactive',
          },
        ]}
        onValueChange={() => {}}
      />,
    )

    expect(
      screen.getByRole('combobox', {
        name: 'Filter by status',
      }),
    ).toHaveTextContent('Active')
  })

  it('shows the clear filters action when filters are active', () => {
    renderWithProviders(
      <FilterBar hasActiveFilters onClear={() => {}}>
        <span>Filters</span>
      </FilterBar>,
    )

    expect(
      screen.getByRole('button', {
        name: 'Clear filters',
      }),
    ).toBeInTheDocument()
  })

  it('hides the clear filters action when filters are inactive', () => {
    renderWithProviders(
      <FilterBar hasActiveFilters={false} onClear={() => {}}>
        <span>Filters</span>
      </FilterBar>,
    )

    expect(
      screen.queryByRole('button', {
        name: 'Clear filters',
      }),
    ).not.toBeInTheDocument()
  })
})
