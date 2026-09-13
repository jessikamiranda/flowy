import { zodResolver } from '@hookform/resolvers/zod'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'

import { FormInput } from '@/components/form/FormInput/FormInput'

import { getLoginSchema } from './schemas/login.schema'

const schema = getLoginSchema({
  required: 'This field is required.',
  invalidEmail: 'Please enter a valid email address.',
})

function TestLoginForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <form noValidate onSubmit={handleSubmit(() => undefined)}>
      <FormInput control={control} name="email" label="Email" type="email" />

      <FormInput
        control={control}
        name="password"
        label="Password"
        type="password"
        passwordVisibilityLabels={{
          show: 'Show password',
          hide: 'Hide password',
        }}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

describe('login form validation integration', () => {
  it('shows Zod validation errors on submit', async () => {
    const user = userEvent.setup()

    render(<TestLoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    await user.type(emailInput, 'invalid-email')

    await user.click(
      screen.getByRole('button', {
        name: 'Submit',
      }),
    )

    expect(
      await screen.findByText('Please enter a valid email address.'),
    ).toBeInTheDocument()

    expect(await screen.findByText('This field is required.')).toBeInTheDocument()

    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    expect(passwordInput).toHaveAttribute('aria-invalid', 'true')
  })
})
