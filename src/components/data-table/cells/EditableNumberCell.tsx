'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import type { EditableCellErrorHandler, EditableCellSaveHandler } from './types'

type Props = {
  value: number | null | undefined
  onSave: EditableCellSaveHandler<number | null>

  displayValue?: (value: number) => React.ReactNode

  placeholder?: string
  ariaLabel?: string

  min?: number
  max?: number
  step?: number

  disabled?: boolean
  className?: string

  onSaveError?: EditableCellErrorHandler
}

export function EditableNumberCell({
  value,
  onSave,
  displayValue,
  placeholder = '—',
  ariaLabel,
  min,
  max,
  step,
  disabled = false,
  className,
  onSaveError,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [draft, setDraft] = useState(
    value === null || value === undefined ? '' : String(value),
  )

  function startEditing() {
    if (disabled) {
      return
    }

    setDraft(value === null || value === undefined ? '' : String(value))

    setIsEditing(true)
  }

  function cancelEditing() {
    setIsEditing(false)
  }

  async function save() {
    const nextValue = draft.trim() === '' ? null : Number(draft)

    if (nextValue !== null && !Number.isFinite(nextValue)) {
      return
    }

    if (nextValue === (value ?? null)) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)

    try {
      await onSave(nextValue)
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
        type="number"
        inputMode="decimal"
        value={draft}
        min={min}
        max={max}
        step={step}
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
      {value !== null && value !== undefined ? (
        (displayValue?.(value) ?? value)
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
    </button>
  )
}
