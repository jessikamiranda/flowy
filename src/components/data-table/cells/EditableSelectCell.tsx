'use client'

import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

import type {
  EditableCellErrorHandler,
  EditableCellSaveHandler,
  EditableSelectOption,
} from './types'

type Props<TValue extends string> = {
  value: TValue
  options: EditableSelectOption<TValue>[]

  onSave: EditableCellSaveHandler<TValue>

  placeholder?: string
  ariaLabel?: string

  disabled?: boolean
  className?: string

  onSaveError?: EditableCellErrorHandler
}

export function EditableSelectCell<TValue extends string>({
  value,
  options,
  onSave,
  placeholder,
  ariaLabel,
  disabled = false,
  className,
  onSaveError,
}: Props<TValue>) {
  const [isSaving, setIsSaving] = useState(false)

  async function handleChange(nextValue: TValue) {
    if (nextValue === value) {
      return
    }

    setIsSaving(true)

    try {
      await onSave(nextValue)
    } catch (error) {
      onSaveError?.(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Select
      items={options}
      value={value}
      disabled={disabled || isSaving}
      onValueChange={(nextValue) => {
        if (nextValue === null) {
          return
        }

        const option = options.find((option) => option.value === nextValue)

        if (!option) {
          return
        }

        void handleChange(option.value)
      }}
    >
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn(
          'h-8 w-full border-transparent bg-transparent shadow-none',
          'cursor-pointer transition-[background-color,border-color,transform] hover:border-transparent hover:brightness-[0.98] active:scale-[0.98]',
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
