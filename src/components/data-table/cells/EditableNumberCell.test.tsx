import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { EditableNumberCell } from './EditableNumberCell'

describe('EditableNumberCell', () => {
  it('saves a number', async () => {
    const user = userEvent.setup()

    const onSave = vi.fn()

    render(<EditableNumberCell value={100} ariaLabel="Edit budget" onSave={onSave} />)

    await user.click(
      screen.getByRole('button', {
        name: 'Edit budget',
      }),
    )

    const input = screen.getByRole('spinbutton', {
      name: 'Edit budget',
    })

    await user.clear(input)
    await user.type(input, '250')
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(250)
    })
  })

  it('converts an empty value to null', async () => {
    const user = userEvent.setup()

    const onSave = vi.fn()

    render(<EditableNumberCell value={100} ariaLabel="Edit budget" onSave={onSave} />)

    await user.click(
      screen.getByRole('button', {
        name: 'Edit budget',
      }),
    )

    const input = screen.getByRole('spinbutton', {
      name: 'Edit budget',
    })

    await user.clear(input)
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(null)
    })
  })

  it('uses the display formatter outside edit mode', () => {
    render(
      <EditableNumberCell
        value={1250}
        ariaLabel="Edit budget"
        displayValue={(value) => `$${value.toFixed(2)}`}
        onSave={() => {}}
      />,
    )

    expect(
      screen.getByRole('button', {
        name: 'Edit budget',
      }),
    ).toHaveTextContent('$1250.00')
  })
})
