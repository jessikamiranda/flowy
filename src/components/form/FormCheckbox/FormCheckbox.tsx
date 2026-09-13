'use client'

import { type ReactNode, useId } from 'react'
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>

  label: ReactNode
  description?: ReactNode

  disabled?: boolean
  id?: string
  className?: string
}

export function FormCheckbox<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  id,
  className,
}: Props<TFieldValues>) {
  const generatedId = useId()

  const fieldId = id ?? generatedId
  const labelId = `${fieldId}-label`
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
          <Field
            orientation="horizontal"
            className={className}
            data-invalid={fieldState.invalid || undefined}
          >
            <Checkbox
              id={fieldId}
              ref={field.ref}
              checked={Boolean(field.value)}
              disabled={disabled}
              onCheckedChange={(checked) => {
                field.onChange(Boolean(checked))
              }}
              onBlur={field.onBlur}
              aria-invalid={fieldState.invalid}
              aria-labelledby={labelId}
              aria-describedby={describedBy || undefined}
            />

            <FieldContent>
              <FieldLabel id={labelId} htmlFor={fieldId}>
                {label}
              </FieldLabel>

              {description && (
                <FieldDescription id={descriptionId}>{description}</FieldDescription>
              )}

              {errorMessage && <FieldError id={errorId}>{errorMessage}</FieldError>}
            </FieldContent>
          </Field>
        )
      }}
    />
  )
}
