import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'

import { FormCheckbox } from './FormCheckbox'
import { FormSelect } from './FormSelect'
import { FormSwitch } from './FormSwitch'
import { FormTextarea } from './FormTextarea'

function TextareaExample() {
  const { control } = useForm<{
    bio: string
  }>({
    defaultValues: {
      bio: '',
    },
  })

  return <FormTextarea control={control} name="bio" label="Biography" />
}

function SelectExample() {
  const { control } = useForm<{
    role: string
  }>({
    defaultValues: {
      role: 'admin',
    },
  })

  return (
    <FormSelect
      control={control}
      name="role"
      label="Role"
      options={[
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Member',
          value: 'member',
        },
      ]}
    />
  )
}

function CheckboxExample() {
  const { control } = useForm<{
    accepted: boolean
  }>({
    defaultValues: {
      accepted: false,
    },
  })

  return <FormCheckbox control={control} name="accepted" label="Accept terms" />
}

function SwitchExample() {
  const { control } = useForm<{
    notifications: boolean
  }>({
    defaultValues: {
      notifications: false,
    },
  })

  return <FormSwitch control={control} name="notifications" label="Notifications" />
}

describe('form components', () => {
  it('updates a textarea value', async () => {
    const user = userEvent.setup()

    render(<TextareaExample />)

    const textarea = screen.getByRole('textbox', {
      name: 'Biography',
    })

    await user.type(textarea, 'Frontend engineer')

    expect(textarea).toHaveValue('Frontend engineer')
  })

  it('renders the selected option label', () => {
    render(<SelectExample />)

    expect(
      screen.getByRole('combobox', {
        name: 'Role',
      }),
    ).toHaveTextContent('Admin')
  })

  it('updates a checkbox value', async () => {
    const user = userEvent.setup()

    render(<CheckboxExample />)

    const checkbox = screen.getByRole('checkbox', {
      name: 'Accept terms',
    })

    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('updates a switch value', async () => {
    const user = userEvent.setup()

    render(<SwitchExample />)

    const switchControl = screen.getByRole('switch', {
      name: 'Notifications',
    })

    expect(switchControl).not.toBeChecked()

    await user.click(switchControl)

    expect(switchControl).toBeChecked()
  })
})
