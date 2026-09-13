import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@/components/ui/button'
import { createDeferred } from '@/test/deferred'
import { renderWithProviders } from '@/test/render'

import { ConfirmDialog } from './ConfirmDialog'

describe('ConfirmDialog', () => {
  it('opens and can be cancelled', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <ConfirmDialog
        trigger={<Button type="button">Delete</Button>}
        title="Delete project?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {}}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Delete',
      }),
    )

    const dialog = screen.getByRole('alertdialog')

    expect(dialog).toBeInTheDocument()

    expect(within(dialog).getByText('Delete project?')).toBeInTheDocument()

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Cancel',
      }),
    )

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })
  })

  it('runs the confirmation action', async () => {
    const user = userEvent.setup()

    const onConfirm = vi.fn()

    renderWithProviders(
      <ConfirmDialog
        trigger={<Button type="button">Archive</Button>}
        title="Archive project?"
        confirmLabel="Confirm archive"
        onConfirm={onConfirm}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Archive',
      }),
    )

    const dialog = screen.getByRole('alertdialog')

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Confirm archive',
      }),
    )

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledOnce()
    })

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })
  })

  it('stays open while confirmation is pending', async () => {
    const user = userEvent.setup()

    const confirmation = createDeferred()

    const onConfirm = vi.fn(() => confirmation.promise)

    renderWithProviders(
      <ConfirmDialog
        trigger={<Button type="button">Delete</Button>}
        title="Delete project?"
        confirmLabel="Delete"
        processingLabel="Deleting..."
        variant="destructive"
        onConfirm={onConfirm}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Delete',
      }),
    )

    const dialog = screen.getByRole('alertdialog')

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Delete',
      }),
    )

    expect(dialog).toBeInTheDocument()

    expect(
      within(dialog).getByRole('button', {
        name: 'Deleting...',
      }),
    ).toBeDisabled()

    expect(
      within(dialog).getByRole('button', {
        name: 'Cancel',
      }),
    ).toBeDisabled()

    confirmation.resolve()

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })
  })

  it('keeps the dialog open when confirmation fails', async () => {
    const user = userEvent.setup()

    const error = new Error('Delete failed')

    const onError = vi.fn()

    const onConfirm = vi.fn().mockRejectedValue(error)

    renderWithProviders(
      <ConfirmDialog
        trigger={<Button type="button">Delete</Button>}
        title="Delete project?"
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={onConfirm}
        onError={onError}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Delete',
      }),
    )

    const dialog = screen.getByRole('alertdialog')

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Delete',
      }),
    )

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error)
    })

    expect(dialog).toBeInTheDocument()

    expect(
      within(dialog).getByRole('button', {
        name: 'Delete',
      }),
    ).toBeEnabled()
  })
})
