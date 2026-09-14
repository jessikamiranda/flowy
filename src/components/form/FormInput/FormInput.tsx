'use client'

import { Eye, EyeOff } from 'lucide-react'
import { type HTMLInputTypeAttribute, useId, useState } from 'react'
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type PasswordVisibilityLabels = {
  show: string
  hide: string
}

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  id?: string
  format?: (value: string) => string
  disabled?: boolean
  autoComplete?: string
  passwordVisibilityLabels?: PasswordVisibilityLabels
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  id,
  format,
  disabled = false,
  autoComplete,
  passwordVisibilityLabels,
}: Props<T>) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          data-disabled={disabled}
          className="gap-2"
        >
          <FieldLabel
            htmlFor={inputId}
            className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
          >
            {label}
          </FieldLabel>

          <div className="relative">
            <Input
              {...field}
              id={inputId}
              type={inputType}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.error ? `${inputId}-error` : undefined}
              className={isPassword ? 'pr-12' : undefined}
              value={field.value ?? ''}
              onChange={(event) => {
                const value = format ? format(event.target.value) : event.target.value

                field.onChange(value)
              }}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-pressed={showPassword}
                aria-label={
                  showPassword
                    ? (passwordVisibilityLabels?.hide ?? 'Hide password')
                    : (passwordVisibilityLabels?.show ?? 'Show password')
                }
                className="absolute top-1/2 right-3.5 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>

          {fieldState.error && (
            <FieldError id={`${inputId}-error`} errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}
