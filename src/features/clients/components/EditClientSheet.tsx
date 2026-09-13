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
import { useRouter } from '@/i18n/navigation'

import { updateClient } from '../actions/updateClient'
import { type ClientFormValues, clientSchema } from '../schemas/client.schema'
import type { Client } from '../types/client'
import { ClientFormFields } from './ClientFormFields'

type Props = {
  client: Client
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditClientSheet({ client, open, onOpenChange }: Props) {
  const t = useTranslations('general.clients')
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client.name,
      company: client.company,
      email: client.email ?? '',
      phone: client.phone ?? '',
      status: client.status,
    },
  })

  useEffect(() => {
    if (!open) {
      return
    }

    reset({
      name: client.name,
      company: client.company,
      email: client.email ?? '',
      phone: client.phone ?? '',
      status: client.status,
    })
  }, [client, open, reset])

  async function onSubmit(values: ClientFormValues) {
    const result = await updateClient(client.id, values)

    if (!result.success) {
      toast.error(t('messages.updateError'))
      return
    }

    toast.success(t('messages.updateSuccess'))

    onOpenChange(false)
    router.refresh()
  }

  const formId = `edit-client-${client.id}`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('editForm.title')}</SheetTitle>

          <SheetDescription>
            {t('editForm.description', {
              company: client.company,
            })}
          </SheetDescription>
        </SheetHeader>

        <form
          id={formId}
          noValidate
          className="flex-1 overflow-y-auto px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ClientFormFields control={control} disabled={isSubmitting} />
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
