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
import type { Project } from '@/features/projects/types/project'
import { useRouter } from '@/i18n/navigation'

import { updateTask } from '../actions/updateTask'
import { type TaskFormValues, taskSchema } from '../schemas/task.schema'
import type { Task } from '../types/task'
import { TaskFormFields } from './TaskFormFields'

type Props = {
  task: Task
  projects: Project[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskSheet({ task, projects, open, onOpenChange }: Props) {
  const t = useTranslations('general.tasks')
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      projectId: task.project.id,
      title: task.title,
      description: task.description ?? '',
      status: task.status,
      priority: task.priority,
      dueDate: task.due_date ?? '',
    },
  })

  useEffect(() => {
    if (!open) {
      return
    }

    reset({
      projectId: task.project.id,
      title: task.title,
      description: task.description ?? '',
      status: task.status,
      priority: task.priority,
      dueDate: task.due_date ?? '',
    })
  }, [open, reset, task])

  async function onSubmit(values: TaskFormValues) {
    const result = await updateTask(task.id, values)

    if (!result.success) {
      toast.error(t('messages.updateError'))
      return
    }

    toast.success(t('messages.updateSuccess'))

    onOpenChange(false)
    router.refresh()
  }

  const formId = `edit-task-${task.id}`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('editForm.title')}</SheetTitle>

          <SheetDescription>
            {t('editForm.description', {
              task: task.title,
            })}
          </SheetDescription>
        </SheetHeader>

        <form
          id={formId}
          noValidate
          className="flex-1 overflow-y-auto px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TaskFormFields control={control} projects={projects} disabled={isSubmitting} />
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
