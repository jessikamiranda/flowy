'use client'

import { useTranslations } from 'next-intl'
import { type Control, useWatch } from 'react-hook-form'

import { FormDatePicker } from '@/components/form/FormDatePicker/FormDatePicker'
import { FormInput } from '@/components/form/FormInput/FormInput'
import { FormSelect } from '@/components/form/FormSelect/FormSelect'
import { FormTextarea } from '@/components/form/FormTextarea/FormTextarea'
import { FieldGroup } from '@/components/ui/field'
import type { Client } from '@/features/clients/types/client'

import { type ProjectFormValues } from '../schemas/project.schema'

type Props = {
  control: Control<ProjectFormValues>
  clients: Client[]
  disabled?: boolean
}

export function ProjectFormFields({ control, clients, disabled = false }: Props) {
  const t = useTranslations('general.projects')

  const startDate = useWatch({
    control,
    name: 'startDate',
  })

  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.company,
  }))

  return (
    <FieldGroup>
      <FormSelect
        control={control}
        name="clientId"
        label={t('form.client')}
        placeholder={t('form.clientPlaceholder')}
        options={clientOptions}
        disabled={disabled}
      />

      <FormInput
        control={control}
        name="name"
        label={t('form.name')}
        placeholder={t('form.namePlaceholder')}
        disabled={disabled}
      />

      <FormTextarea
        control={control}
        name="description"
        label={t('form.descriptionLabel')}
        placeholder={t('form.descriptionPlaceholder')}
        disabled={disabled}
        rows={4}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelect
          control={control}
          name="status"
          label={t('form.status')}
          options={[
            {
              value: 'planning',
              label: t('status.planning'),
            },
            {
              value: 'in_progress',
              label: t('status.inProgress'),
            },
            {
              value: 'on_hold',
              label: t('status.onHold'),
            },
            {
              value: 'completed',
              label: t('status.completed'),
            },
          ]}
          disabled={disabled}
        />

        <FormSelect
          control={control}
          name="priority"
          label={t('form.priority')}
          options={[
            {
              value: 'low',
              label: t('priority.low'),
            },
            {
              value: 'medium',
              label: t('priority.medium'),
            },
            {
              value: 'high',
              label: t('priority.high'),
            },
          ]}
          disabled={disabled}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormDatePicker
          control={control}
          name="startDate"
          label={t('form.startDate')}
          disabled={disabled}
        />

        <FormDatePicker
          control={control}
          name="dueDate"
          label={t('form.dueDate')}
          minDate={startDate}
          disabled={disabled}
        />
      </div>
    </FieldGroup>
  )
}
