'use client'

import { type ComponentProps, type ReactNode, useId } from 'react'
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

type Props<TFieldValues extends FieldValues> = Omit<
  ComponentProps<typeof Textarea>,
  'name' | 'defaultValue' | 'value' | 'onChange' | 'onBlur' | 'ref'
> & {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: ReactNode
  description?: ReactNode
  id?: string
}

export function FormTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  id,
  ...textareaProps
}: Props<TFieldValues>) {
  const generatedId = useId()

  const fieldId = id ?? generatedId
  const descriptionId = `${fieldId}-description`
  const errorId = `${fieldId}-error`

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        const describedBy = [
          description ? descriptionId : undefined,
          errorMessage ? errorId : undefined,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <Field data-invalid={fieldState.invalid || undefined}>
            <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>

            <Textarea
              {...textareaProps}
              id={fieldId}
              name={field.name}
              ref={field.ref}
              value={typeof field.value === 'string' ? field.value : ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={fieldState.invalid}
              aria-describedby={describedBy || undefined}
            />

            {description && (
              <FieldDescription id={descriptionId}>{description}</FieldDescription>
            )}

            {errorMessage && <FieldError id={errorId}>{errorMessage}</FieldError>}
          </Field>
        )
      }}
    />
  )
}
