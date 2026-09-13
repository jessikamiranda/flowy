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
import type { Project } from '@/features/projects/types/project'
import { useRouter } from '@/i18n/navigation'

import { createTask } from '../actions/createTask'
import { type TaskFormValues, taskSchema } from '../schemas/task.schema'
import { TaskFormFields } from './TaskFormFields'

type Props = {
  projects: Project[]
}

export function NewTaskSheet({ projects }: Props) {
  const t = useTranslations('general.tasks')
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      projectId: '',
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
    },
  })

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      reset()
    }
  }

  async function onSubmit(values: TaskFormValues) {
    const result = await createTask(values)

    if (!result.success) {
      toast.error(t('messages.createError'))
      return
    }

    toast.success(t('messages.createSuccess'))

    reset()
    setOpen(false)
    router.refresh()
  }

  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: `${project.name} · ${project.client.company}`,
  }))

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          <Button disabled={projects.length === 0}>
            <Plus aria-hidden="true" />
            {t('actions.newTask')}
          </Button>
        }
      />

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('form.title')}</SheetTitle>
          <SheetDescription>{t('form.description')}</SheetDescription>
        </SheetHeader>

        <form
          id="new-task-form"
          noValidate
          className="flex-1 overflow-y-auto px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TaskFormFields control={control} projects={projects} disabled={isSubmitting} />
        </form>

        <SheetFooter>
          <Button
            type="submit"
            form="new-task-form"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? t('actions.creating') : t('actions.createTask')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
