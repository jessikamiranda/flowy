'use client'

import { useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

import type { FilterOption } from './types'

const ALL_VALUE = '__filter_all__'

type Props = {
  label: string
  placeholder: string

  value?: string | null

  options: FilterOption[]

  onValueChange: (value: string | null) => void

  allLabel?: string
  className?: string
}

export function SelectFilter({
  label,
  placeholder,
  value,
  options,
  onValueChange,
  allLabel,
  className,
}: Props) {
  const t = useTranslations('general.filters')

  return (
    <Select
      items={options}
      value={value || null}
      onValueChange={(nextValue) => {
        if (nextValue === null || nextValue === ALL_VALUE) {
          onValueChange(null)
          return
        }

        onValueChange(nextValue)
      }}
    >
      <SelectTrigger aria-label={label} className={cn('w-full sm:w-44', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value={ALL_VALUE}>{allLabel ?? t('all')}</SelectItem>

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
  )
}
