'use client'

import { type ReactNode, useId } from 'react'
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type FormSelectOption = {
  label: string
  value: string
  disabled?: boolean
}

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>

  label: ReactNode
  description?: ReactNode

  options: FormSelectOption[]
  placeholder?: string

  disabled?: boolean
  id?: string
  className?: string
}

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  placeholder,
  disabled,
  id,
  className,
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

        const value =
          typeof field.value === 'string' && field.value.length > 0 ? field.value : null

        return (
          <Field data-invalid={fieldState.invalid || undefined}>
            <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>

            <Select
              items={options}
              value={value}
              disabled={disabled}
              onValueChange={(nextValue) => {
                field.onChange(nextValue ?? '')
              }}
            >
              <SelectTrigger
                id={fieldId}
                ref={field.ref}
                onBlur={field.onBlur}
                className={className}
                aria-invalid={fieldState.invalid}
                aria-describedby={describedBy || undefined}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

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
