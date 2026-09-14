'use client'

import { CalendarIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useId, useState } from 'react'
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label: string
  placeholder?: string
  disabled?: boolean
  minDate?: string
  id?: string
}

function parseDate(value: unknown) {
  if (typeof value !== 'string' || !value) {
    return undefined
  }

  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) {
    return undefined
  }

  return new Date(year, month - 1, day)
}

function serializeDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function FormDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  minDate,
  id,
}: Props<T>) {
  const t = useTranslations('general.datePicker')
  const locale = useLocale()

  const generatedId = useId()
  const fieldId = id ?? generatedId

  const [open, setOpen] = useState(false)
  const minimumDate = parseDate(minDate)

  function isBeforeMinimumDate(date: Date) {
    if (!minimumDate) {
      return false
    }

    return date < minimumDate
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedDate = parseDate(field.value)
        const errorId = `${fieldId}-error`

        function setDate(date: Date) {
          field.onChange(serializeDate(date))
          setOpen(false)
        }

        function getRelativeDate(days: number) {
          const date = new Date()

          date.setHours(0, 0, 0, 0)
          date.setDate(date.getDate() + days)

          return date
        }

        function getEndOfMonth() {
          const now = new Date()

          return new Date(now.getFullYear(), now.getMonth() + 1, 0)
        }

        const today = getRelativeDate(0)
        const tomorrow = getRelativeDate(1)
        const inOneWeek = getRelativeDate(7)
        const endOfMonth = getEndOfMonth()

        return (
          <Field
            data-invalid={fieldState.invalid || undefined}
            data-disabled={disabled || undefined}
            className="gap-2"
          >
            <FieldLabel
              htmlFor={fieldId}
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
            >
              {label}
            </FieldLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <Button
                    id={fieldId}
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.error ? errorId : undefined}
                    className="h-11 w-full justify-start rounded-xl border-input bg-card/70 px-3.5 font-normal shadow-none hover:bg-card dark:bg-background/45 dark:hover:bg-background/70"
                  >
                    <CalendarIcon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />

                    <span className={selectedDate ? undefined : 'text-muted-foreground'}>
                      {selectedDate
                        ? formatter.format(selectedDate)
                        : (placeholder ?? t('placeholder'))}
                    </span>
                  </Button>
                }
              />

              <PopoverContent
                align="start"
                className="w-auto overflow-hidden rounded-2xl border-border/70 p-0 shadow-xl shadow-black/5"
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  defaultMonth={selectedDate}
                  disabled={
                    minimumDate
                      ? {
                          before: minimumDate,
                        }
                      : undefined
                  }
                  onSelect={(date) => {
                    if (date) {
                      setDate(date)
                    }
                  }}
                />

                <div className="grid grid-cols-2 gap-2 border-t border-border/60 bg-muted/20 p-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isBeforeMinimumDate(today)}
                    onClick={() => setDate(today)}
                    className="rounded-xl bg-card/70"
                  >
                    {t('today')}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isBeforeMinimumDate(tomorrow)}
                    onClick={() => setDate(tomorrow)}
                    className="rounded-xl bg-card/70"
                  >
                    {t('tomorrow')}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isBeforeMinimumDate(inOneWeek)}
                    onClick={() => setDate(inOneWeek)}
                    className="rounded-xl bg-card/70"
                  >
                    {t('inOneWeek')}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isBeforeMinimumDate(endOfMonth)}
                    onClick={() => setDate(endOfMonth)}
                    className="rounded-xl bg-card/70"
                  >
                    {t('endOfMonth')}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="col-span-2 rounded-xl text-muted-foreground"
                    disabled={!selectedDate}
                    onClick={() => {
                      field.onChange('')
                      setOpen(false)
                    }}
                  >
                    {t('clear')}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {fieldState.error && <FieldError id={errorId} errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
