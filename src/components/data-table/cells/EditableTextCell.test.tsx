import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { EditableTextCell } from './EditableTextCell'

describe('EditableTextCell', () => {
  it('saves the edited value with Enter', async () => {
    const user = userEvent.setup()

    const onSave = vi.fn()

    render(<EditableTextCell value="Olivia" ariaLabel="Edit name" onSave={onSave} />)

    await user.click(
      screen.getByRole('button', {
        name: 'Edit name',
      }),
    )

    const input = screen.getByRole('textbox', {
      name: 'Edit name',
    })

    await user.clear(input)
    await user.type(input, 'Sofia')
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith('Sofia')
    })
  })

  it('cancels the edit with Escape', async () => {
    const user = userEvent.setup()

    const onSave = vi.fn()

    render(<EditableTextCell value="Olivia" ariaLabel="Edit name" onSave={onSave} />)

    await user.click(
      screen.getByRole('button', {
        name: 'Edit name',
      }),
    )

    const input = screen.getByRole('textbox', {
      name: 'Edit name',
    })

    await user.clear(input)
    await user.type(input, 'Sofia')
    await user.keyboard('{Escape}')

    expect(onSave).not.toHaveBeenCalled()

    expect(
      screen.getByRole('button', {
        name: 'Edit name',
      }),
    ).toHaveTextContent('Olivia')
  })

  it('does not save when the value did not change', async () => {
    const user = userEvent.setup()

    const onSave = vi.fn()

    render(<EditableTextCell value="Olivia" ariaLabel="Edit name" onSave={onSave} />)

    await user.click(
      screen.getByRole('button', {
        name: 'Edit name',
      }),
    )

    await user.keyboard('{Enter}')

    expect(onSave).not.toHaveBeenCalled()
  })

  it('reports save errors', async () => {
    const user = userEvent.setup()

    const error = new Error('Save failed')

    const onSave = vi.fn().mockRejectedValue(error)

    const onSaveError = vi.fn()

    render(
      <EditableTextCell
        value="Olivia"
        ariaLabel="Edit name"
        onSave={onSave}
        onSaveError={onSaveError}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Edit name',
      }),
    )

    const input = screen.getByRole('textbox', {
      name: 'Edit name',
    })

    await user.clear(input)
    await user.type(input, 'Sofia')
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(onSaveError).toHaveBeenCalledWith(error)
    })
  })
})
