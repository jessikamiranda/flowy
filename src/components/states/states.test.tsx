import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'

describe('states', () => {
  it('renders an empty state', () => {
    render(
      <EmptyState
        title="No projects"
        description="Create your first project."
        action={<button type="button">Create project</button>}
      />,
    )

    expect(screen.getByText('No projects')).toBeInTheDocument()

    expect(screen.getByText('Create your first project.')).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Create project',
      }),
    ).toBeInTheDocument()
  })

  it('renders an error state', () => {
    render(<ErrorState title="Something went wrong" description="Try again later." />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    expect(screen.getByText('Try again later.')).toBeInTheDocument()
  })

  it('renders an accessible loading state', () => {
    render(<LoadingState label="Loading projects..." />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading projects...')
  })
})
