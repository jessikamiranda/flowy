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
import { useRouter } from '@/i18n/navigation'

import { createClient } from '../actions/createClient'
import { type ClientFormValues, clientSchema } from '../schemas/client.schema'
import { ClientFormFields } from './ClientFormFields'

export function NewClientSheet() {
  const t = useTranslations('general.clients')
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'active',
    },
  })

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      reset()
    }
  }

  async function onSubmit(values: ClientFormValues) {
    const result = await createClient(values)

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
          <Button className="h-10 rounded-xl px-4 font-semibold shadow-none [&_svg]:text-brand-lime">
            <Plus aria-hidden="true" />
            {t('actions.newClient')}
          </Button>
        }
      />

      <SheetContent className="w-full sm:max-w-[30rem]">
        <SheetHeader>
          <SheetTitle>{t('form.title')}</SheetTitle>
          <SheetDescription>{t('form.description')}</SheetDescription>
        </SheetHeader>

        <form
          id="new-client-form"
          noValidate
          className="flex-1 overflow-y-auto overscroll-contain bg-background/30 px-5 py-6 sm:px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ClientFormFields control={control} disabled={isSubmitting} />
        </form>

        <SheetFooter>
          <Button
            type="submit"
            form="new-client-form"
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl px-5 font-semibold shadow-none sm:w-auto sm:min-w-36"
          >
            {isSubmitting ? t('actions.creating') : t('actions.createClient')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
