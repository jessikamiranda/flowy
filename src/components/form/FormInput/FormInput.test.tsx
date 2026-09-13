import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'

import { FormInput } from './FormInput'

type PasswordFormValues = {
  password: string
}

function PasswordForm() {
  const { control } = useForm<PasswordFormValues>({
    defaultValues: {
      password: '',
    },
  })

  return (
    <FormInput
      name="password"
      control={control}
      label="Password"
      type="password"
      passwordVisibilityLabels={{
        show: 'Show password',
        hide: 'Hide password',
      }}
    />
  )
}

type FormattedFormValues = {
  code: string
}

function FormattedForm() {
  const { control } = useForm<FormattedFormValues>({
    defaultValues: {
      code: '',
    },
  })

  return (
    <FormInput
      name="code"
      control={control}
      label="Code"
      format={(value) => value.toUpperCase()}
    />
  )
}

describe('FormInput', () => {
  it('associates the label with the input', () => {
    render(<PasswordForm />)

    const input = screen.getByLabelText('Password')

    expect(input).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()

    render(<PasswordForm />)

    const input = screen.getByLabelText('Password')

    expect(input).toHaveAttribute('type', 'password')

    await user.click(
      screen.getByRole('button', {
        name: 'Show password',
      }),
    )

    expect(input).toHaveAttribute('type', 'text')

    expect(
      screen.getByRole('button', {
        name: 'Hide password',
      }),
    ).toBeInTheDocument()
  })

  it('updates the value when the user types', async () => {
    const user = userEvent.setup()

    render(<PasswordForm />)

    const input = screen.getByLabelText('Password')

    await user.type(input, 'my-password')

    expect(input).toHaveValue('my-password')
  })

  it('applies the formatter when the value changes', async () => {
    const user = userEvent.setup()

    render(<FormattedForm />)

    const input = screen.getByLabelText('Code')

    await user.type(input, 'abc123')

    expect(input).toHaveValue('ABC123')
  })
})
