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

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          <Button
            disabled={projects.length === 0}
            className="h-10 rounded-xl px-4 font-semibold shadow-none [&_svg]:text-brand-lime"
          >
            <Plus aria-hidden="true" />
            {t('actions.newTask')}
          </Button>
        }
      />

      <SheetContent className="w-full sm:max-w-[34rem]">
        <SheetHeader>
          <SheetTitle>{t('form.title')}</SheetTitle>
          <SheetDescription>{t('form.description')}</SheetDescription>
        </SheetHeader>

        <form
          id="new-task-form"
          noValidate
          className="flex-1 overflow-y-auto overscroll-contain bg-background/30 px-5 py-6 sm:px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TaskFormFields control={control} projects={projects} disabled={isSubmitting} />
        </form>

        <SheetFooter>
          <Button
            type="submit"
            form="new-task-form"
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl px-5 font-semibold shadow-none sm:w-auto sm:min-w-36"
          >
            {isSubmitting ? t('actions.creating') : t('actions.createTask')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
