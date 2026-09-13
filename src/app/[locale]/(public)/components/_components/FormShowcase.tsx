'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from '@/components/form'
import { Button } from '@/components/ui/button'

import { ComponentSection } from './ComponentSection'

type FormValues = {
  name: string
  role: string
  bio: string
  notifications: boolean
  acceptedTerms: boolean
}

export function FormShowcase() {
  const t = useTranslations('general.showcase.forms')

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      notifications: true,
      acceptedTerms: false,
    },
  })

  const roleOptions = [
    {
      label: t('roles.admin'),
      value: 'admin',
    },
    {
      label: t('roles.member'),
      value: 'member',
    },
    {
      label: t('roles.viewer'),
      value: 'viewer',
    },
  ]

  return (
    <ComponentSection title={t('title')} description={t('description')}>
      <form
        noValidate
        className="mx-auto max-w-2xl space-y-6"
        onSubmit={handleSubmit(() => {})}
      >
        <FormInput
          control={control}
          name="name"
          label={t('fields.name')}
          placeholder={t('fields.namePlaceholder')}
        />

        <FormSelect
          control={control}
          name="role"
          label={t('fields.role')}
          placeholder={t('fields.rolePlaceholder')}
          options={roleOptions}
        />

        <FormTextarea
          control={control}
          name="bio"
          label={t('fields.bio')}
          placeholder={t('fields.bioPlaceholder')}
          rows={4}
        />

        <FormSwitch
          control={control}
          name="notifications"
          label={t('fields.notifications')}
          description={t('fields.notificationsDescription')}
        />

        <FormCheckbox control={control} name="acceptedTerms" label={t('fields.terms')} />

        <div className="flex flex-wrap gap-2">
          <Button type="submit">{t('submit')}</Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset()
            }}
          >
            {t('reset')}
          </Button>
        </div>
      </form>
    </ComponentSection>
  )
}
