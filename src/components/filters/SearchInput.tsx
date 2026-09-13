'use client'

import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Props = Omit<ComponentProps<typeof Input>, 'type' | 'value' | 'onChange'> & {
  value: string
  onValueChange: (value: string) => void
  clearLabel?: string
}

export function SearchInput({
  value,
  onValueChange,
  clearLabel,
  className,
  ...props
}: Props) {
  const t = useTranslations('general.filters')

  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        {...props}
        type="search"
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value)
        }}
        className={cn(
          'h-9 pl-9',
          value && 'pr-9',
          '[&::-webkit-search-cancel-button]:hidden',
          '[&::-webkit-search-decoration]:hidden',
          className,
        )}
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={clearLabel ?? t('clearSearch')}
          onClick={() => {
            onValueChange('')
          }}
          className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
        >
          <X aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}
