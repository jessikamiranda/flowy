'use client'

import { LoaderCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type ReactElement, type ReactNode, useCallback, useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type Props = {
  trigger?: ReactElement

  title: ReactNode
  description?: ReactNode

  confirmLabel?: ReactNode
  cancelLabel?: ReactNode
  processingLabel?: ReactNode

  variant?: 'default' | 'destructive'
  size?: 'default' | 'sm'

  onConfirm: () => void | Promise<void>
  onError?: (error: unknown) => void

  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel,
  processingLabel,
  variant = 'default',
  size = 'sm',
  onConfirm,
  onError,
  open: controlledOpen,
  onOpenChange,
}: Props) {
  const t = useTranslations('general.confirmDialog')

  const [internalOpen, setInternalOpen] = useState(false)

  const [isPending, setIsPending] = useState(false)

  const open = controlledOpen ?? internalOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [controlledOpen, onOpenChange],
  )

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (isPending && !nextOpen) {
        return
      }

      setOpen(nextOpen)
    },
    [isPending, setOpen],
  )

  const handleConfirm = useCallback(async () => {
    setIsPending(true)

    try {
      await onConfirm()

      setOpen(false)
    } catch (error) {
      onError?.(error)
    } finally {
      setIsPending(false)
    }
  }, [onConfirm, onError, setOpen])

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <AlertDialogTrigger render={trigger} />}

      <AlertDialogContent size={size} aria-busy={isPending}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {cancelLabel ?? t('cancel')}
          </AlertDialogCancel>

          <Button
            type="button"
            variant={variant}
            disabled={isPending}
            onClick={() => {
              void handleConfirm()
            }}
          >
            {isPending && <LoaderCircle aria-hidden="true" className="animate-spin" />}

            {isPending
              ? (processingLabel ?? t('processing'))
              : (confirmLabel ?? t('confirm'))}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
