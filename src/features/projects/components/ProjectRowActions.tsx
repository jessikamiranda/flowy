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
import type { Client } from '@/features/clients/types/client'
import { useRouter } from '@/i18n/navigation'

import { deleteProject } from '../actions/deleteProject'
import type { Project } from '../types/project'
import { EditProjectSheet } from './EditProjectSheet'

type Props = {
  project: Project
  clients: Client[]
}

export function ProjectRowActions({ project, clients }: Props) {
  const t = useTranslations('general.projects')
  const router = useRouter()

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    const result = await deleteProject(project.id)

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
                name: project.name,
              })}
            >
              <MoreHorizontal aria-hidden="true" />
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setEditOpen(true)
            }}
          >
            <Pencil aria-hidden="true" />
            {t('actions.edit')}
          </DropdownMenuItem>

          <DropdownMenuItem
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

      <EditProjectSheet
        project={project}
        clients={clients}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={t('deleteDialog.title')}
        description={t('deleteDialog.description', {
          project: project.name,
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
