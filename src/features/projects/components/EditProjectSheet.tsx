'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { Client } from '@/features/clients/types/client'
import { useRouter } from '@/i18n/navigation'

import { updateProject } from '../actions/updateProject'
import { type ProjectFormValues, projectSchema } from '../schemas/project.schema'
import type { Project } from '../types/project'
import { ProjectFormFields } from './ProjectFormFields'

type Props = {
  project: Project
  clients: Client[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProjectSheet({ project, clients, open, onOpenChange }: Props) {
  const t = useTranslations('general.projects')
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      clientId: project.client.id,
      name: project.name,
      description: project.description ?? '',
      status: project.status,
      priority: project.priority,
      startDate: project.start_date ?? '',
      dueDate: project.due_date ?? '',
    },
  })

  useEffect(() => {
    if (!open) {
      return
    }

    reset({
      clientId: project.client.id,
      name: project.name,
      description: project.description ?? '',
      status: project.status,
      priority: project.priority,
      startDate: project.start_date ?? '',
      dueDate: project.due_date ?? '',
    })
  }, [open, project, reset])

  async function onSubmit(values: ProjectFormValues) {
    const result = await updateProject(project.id, values)

    if (!result.success) {
      toast.error(t('messages.updateError'))
      return
    }

    toast.success(t('messages.updateSuccess'))

    onOpenChange(false)
    router.refresh()
  }

  const formId = `edit-project-${project.id}`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('editForm.title')}</SheetTitle>

          <SheetDescription>
            {t('editForm.description', {
              project: project.name,
            })}
          </SheetDescription>
        </SheetHeader>

        <form
          id={formId}
          noValidate
          className="flex-1 overflow-y-auto px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ProjectFormFields
            control={control}
            clients={clients}
            disabled={isSubmitting}
          />
        </form>

        <SheetFooter>
          <Button type="submit" form={formId} disabled={isSubmitting} className="w-full">
            {isSubmitting ? t('actions.saving') : t('actions.saveChanges')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
