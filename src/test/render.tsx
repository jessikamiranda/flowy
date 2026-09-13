import { render, type RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import type { ReactElement, ReactNode } from 'react'

import { type Locale } from '@/i18n/routing'

const messages = {
  general: {
    dataTable: {
      noResults: 'No results.',
      selectAllRows: 'Select all rows on this page',
      selectRow: 'Select row',
      previousPage: 'Previous page',
      nextPage: 'Next page',

      searchPlaceholder: 'Search...',
      all: 'All',
      clearFilters: 'Clear filters',

      columns: 'Columns',
      toggleColumns: 'Toggle columns',

      selectedForActions: '{count, plural, one {# row selected} other {# rows selected}}',
      clearSelection: 'Clear selection',

      resizeColumn: 'Resize {column} column',

      recordsSummary:
        'Showing {start}–{end} of {count, plural, one {# record} other {# records}}',
      filteredRecordsSummary:
        'Showing {start}–{end} of {filtered, plural, one {# filtered record} other {# filtered records}} · {total, plural, one {# record total} other {# records total}}',
    },

    confirmDialog: {
      cancel: 'Cancel',
      confirm: 'Confirm',
      processing: 'Processing...',
    },

    filters: {
      all: 'All',
      clear: 'Clear filters',
      clearSearch: 'Clear search',
    },
  },
}

type Options = Omit<RenderOptions, 'wrapper'> & {
  locale?: Locale
}

export function renderWithProviders(
  ui: ReactElement,
  { locale = 'en', ...options }: Options = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    )
  }

  return render(ui, {
    wrapper: Wrapper,
    ...options,
  })
}
