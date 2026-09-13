'use client'

import { useTranslations } from 'next-intl'
import type { Control } from 'react-hook-form'

import { FormDatePicker } from '@/components/form/FormDatePicker/FormDatePicker'
import { FormInput } from '@/components/form/FormInput/FormInput'
import { FormSelect } from '@/components/form/FormSelect/FormSelect'
import { FormTextarea } from '@/components/form/FormTextarea/FormTextarea'
import { FieldGroup } from '@/components/ui/field'
import type { Project } from '@/features/projects/types/project'

import type { TaskFormValues } from '../schemas/task.schema'

type Props = {
  control: Control<TaskFormValues>
  projects: Project[]
  disabled?: boolean
}

export function TaskFormFields({ control, projects, disabled = false }: Props) {
  const t = useTranslations('general.tasks')

  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: `${project.name} · ${project.client.company}`,
  }))

  return (
    <FieldGroup>
      <FormSelect
        control={control}
        name="projectId"
        label={t('form.project')}
        placeholder={t('form.projectPlaceholder')}
        options={projectOptions}
        disabled={disabled}
      />

      <FormInput
        control={control}
        name="title"
        label={t('form.taskTitle')}
        placeholder={t('form.taskTitlePlaceholder')}
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
              value: 'todo',
              label: t('status.todo'),
            },
            {
              value: 'in_progress',
              label: t('status.inProgress'),
            },
            {
              value: 'done',
              label: t('status.done'),
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

      <FormDatePicker
        control={control}
        name="dueDate"
        label={t('form.dueDate')}
        disabled={disabled}
      />
    </FieldGroup>
  )
}
