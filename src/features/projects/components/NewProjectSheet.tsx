'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
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
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Client } from '@/features/clients/types/client'
import { useRouter } from '@/i18n/navigation'

import { createProject } from '../actions/createProject'
import { type ProjectFormValues, projectSchema } from '../schemas/project.schema'
import { ProjectFormFields } from './ProjectFormFields'

type Props = {
  clients: Client[]
}

export function NewProjectSheet({ clients }: Props) {
  const t = useTranslations('general.projects')
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      clientId: '',
      name: '',
      description: '',
      status: 'planning',
      priority: 'medium',
      startDate: '',
      dueDate: '',
    },
  })

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      reset()
    }
  }

  async function onSubmit(values: ProjectFormValues) {
    const result = await createProject(values)

    if (!result.success) {
      toast.error(t('messages.createError'))
      return
    }

    toast.success(t('messages.createSuccess'))

    reset()
    setOpen(false)
    router.refresh()
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          <Button disabled={clients.length === 0}>
            <Plus aria-hidden="true" />
            {t('actions.newProject')}
          </Button>
        }
      />

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('form.title')}</SheetTitle>
          <SheetDescription>{t('form.description')}</SheetDescription>
        </SheetHeader>

        <form
          id="new-project-form"
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
          <Button
            type="submit"
            form="new-project-form"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? t('actions.creating') : t('actions.createProject')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
