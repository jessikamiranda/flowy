'use client'

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from '@/i18n/navigation'

import { deleteClient } from '../actions/deleteClient'
import type { Client } from '../types/client'
import { EditClientSheet } from './EditClientSheet'

type Props = {
  client: Client
}

export function ClientRowActions({ client }: Props) {
  const t = useTranslations('general.clients')
  const router = useRouter()

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    const result = await deleteClient(client.id)

    if (!result.success) {
      throw new Error(result.error)
    }

    toast.success(t('messages.deleteSuccess'))
    router.refresh()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t('actions.openMenu', {
                name: client.name,
              })}
              className="rounded-lg text-muted-foreground opacity-55 transition-opacity hover:bg-muted hover:text-foreground hover:opacity-100 focus-visible:opacity-100 group-hover/row:opacity-100"
            >
              <MoreHorizontal aria-hidden="true" />
            </Button>
          }
        />

        <DropdownMenuContent align="end" className="w-40 rounded-xl">
          <DropdownMenuItem
            className="rounded-lg"
            onClick={() => {
              setEditOpen(true)
            }}
          >
            <Pencil aria-hidden="true" />
            {t('actions.edit')}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="rounded-lg"
            variant="destructive"
            onClick={() => {
              setDeleteOpen(true)
            }}
          >
            <Trash2 aria-hidden="true" />
            {t('actions.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditClientSheet client={client} open={editOpen} onOpenChange={setEditOpen} />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={t('deleteDialog.title')}
        description={t('deleteDialog.description', {
          company: client.company,
        })}
        confirmLabel={t('deleteDialog.confirm')}
        processingLabel={t('deleteDialog.deleting')}
        variant="destructive"
        onConfirm={handleDelete}
        onError={() => {
          toast.error(t('messages.deleteError'))
        }}
      />
    </>
  )
}
