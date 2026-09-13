'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import type { EditableCellErrorHandler, EditableCellSaveHandler } from './types'

type Props = {
  value: string | null | undefined
  onSave: EditableCellSaveHandler<string>

  displayValue?: (value: string) => React.ReactNode

  placeholder?: string
  ariaLabel?: string

  disabled?: boolean
  className?: string

  onSaveError?: EditableCellErrorHandler
}

export function EditableTextCell({
  value,
  onSave,
  displayValue,
  placeholder = '—',
  ariaLabel,
  disabled = false,
  className,
  onSaveError,
}: Props) {
  const currentValue = value ?? ''

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [draft, setDraft] = useState(currentValue)

  function startEditing() {
    if (disabled) {
      return
    }

    setDraft(currentValue)
    setIsEditing(true)
  }

  function cancelEditing() {
    setDraft(currentValue)
    setIsEditing(false)
  }

  async function save() {
    if (draft === currentValue) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)

    try {
      await onSave(draft)
      setIsEditing(false)
    } catch (error) {
      onSaveError?.(error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={draft}
        disabled={isSaving}
        aria-label={ariaLabel}
        className={cn('h-8', className)}
        onChange={(event) => {
          setDraft(event.target.value)
        }}
        onBlur={() => {
          void save()
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            event.currentTarget.blur()
          }

          if (event.key === 'Escape') {
            event.preventDefault()
            cancelEditing()
          }
        }}
      />
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'flex min-h-8 w-full items-center rounded-md px-2 text-left',
        'transition-colors hover:bg-muted',
        'disabled:cursor-default disabled:hover:bg-transparent',
        className,
      )}
      onClick={startEditing}
    >
      {currentValue ? (
        (displayValue?.(currentValue) ?? currentValue)
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
    </button>
  )
}
