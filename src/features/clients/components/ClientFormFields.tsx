'use client'

import { useTranslations } from 'next-intl'
import type { Control } from 'react-hook-form'

import { FormInput } from '@/components/form/FormInput/FormInput'
import { FormSelect } from '@/components/form/FormSelect/FormSelect'
import { FieldGroup } from '@/components/ui/field'

import type { ClientFormValues } from '../schemas/client.schema'

type Props = {
  control: Control<ClientFormValues>
  disabled?: boolean
}

export function ClientFormFields({ control, disabled = false }: Props) {
  const t = useTranslations('general.clients.form')

  const statusOptions = [
    {
      value: 'active',
      label: t('statusOptions.active'),
    },
    {
      value: 'inactive',
      label: t('statusOptions.inactive'),
    },
  ]

  return (
    <FieldGroup>
      <FormInput
        control={control}
        name="name"
        label={t('name')}
        placeholder={t('namePlaceholder')}
        autoComplete="name"
        disabled={disabled}
      />

      <FormInput
        control={control}
        name="company"
        label={t('company')}
        placeholder={t('companyPlaceholder')}
        autoComplete="organization"
        disabled={disabled}
      />

      <FormInput
        control={control}
        name="email"
        label={t('email')}
        placeholder={t('emailPlaceholder')}
        type="email"
        autoComplete="email"
        disabled={disabled}
      />

      <FormInput
        control={control}
        name="phone"
        label={t('phone')}
        placeholder={t('phonePlaceholder')}
        type="tel"
        autoComplete="tel"
        disabled={disabled}
      />

      <FormSelect
        control={control}
        name="status"
        label={t('status')}
        options={statusOptions}
        disabled={disabled}
      />
    </FieldGroup>
  )
}
