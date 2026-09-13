'use client'

import { useTranslations } from 'next-intl'

import { FilterBar, SearchInput, SelectFilter } from '@/components/filters'
import { Button } from '@/components/ui/button'
import { useQueryFilters } from '@/hooks/useQueryFilters'

import { ComponentSection } from './ComponentSection'

const FILTER_KEYS = ['demoSearch', 'demoStatus']

export function FiltersShowcase() {
  const t = useTranslations('general.showcase.filters')

  const { getQueryValue, setQueryValue, clearQueryValues } = useQueryFilters()

  const search = getQueryValue('demoSearch')

  const status = getQueryValue('demoStatus')

  const hasActiveFilters = Boolean(search || status)

  const statusOptions = [
    {
      label: t('status.active'),
      value: 'active',
    },
    {
      label: t('status.inactive'),
      value: 'inactive',
    },
  ]

  return (
    <ComponentSection title={t('title')} description={t('description')}>
      <FilterBar
        hasActiveFilters={hasActiveFilters}
        onClear={() => {
          clearQueryValues(FILTER_KEYS)
        }}
        actions={<Button size="sm">{t('action')}</Button>}
      >
        <SearchInput
          value={search}
          aria-label={t('searchLabel')}
          placeholder={t('searchPlaceholder')}
          onValueChange={(value) => {
            setQueryValue('demoSearch', value)
          }}
          className="w-full sm:w-64"
        />

        <SelectFilter
          label={t('statusLabel')}
          placeholder={t('statusPlaceholder')}
          value={status || null}
          options={statusOptions}
          onValueChange={(value) => {
            setQueryValue('demoStatus', value)
          }}
        />
      </FilterBar>

      <div className="mt-6 rounded-lg bg-muted/40 p-4 font-mono text-xs text-muted-foreground">
        demoSearch=
        {search || '∅'}
        {' · '}
        demoStatus=
        {status || '∅'}
      </div>
    </ComponentSection>
  )
}
