const DEFAULT_FALLBACK = '—'

type FormatOptions = {
  fallback?: string
}

type CurrencyOptions = FormatOptions & {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

type NumberOptions = FormatOptions & {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

type PercentageOptions = FormatOptions & {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

type DateOptions = FormatOptions & {
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
}

type DateTimeOptions = FormatOptions & {
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle']
}

function isValidNumber(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isValidDate(value: Date | number | null | undefined): value is Date | number {
  if (value === null || value === undefined) {
    return false
  }

  const date = value instanceof Date ? value : new Date(value)

  return !Number.isNaN(date.getTime())
}

export function formatCurrency(
  value: number | null | undefined,
  locale: string,
  currency: string,
  {
    fallback = DEFAULT_FALLBACK,
    minimumFractionDigits,
    maximumFractionDigits,
  }: CurrencyOptions = {},
) {
  if (!isValidNumber(value)) {
    return fallback
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

export function formatNumber(
  value: number | null | undefined,
  locale: string,
  {
    fallback = DEFAULT_FALLBACK,
    minimumFractionDigits,
    maximumFractionDigits,
  }: NumberOptions = {},
) {
  if (!isValidNumber(value)) {
    return fallback
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

export function formatPercentage(
  value: number | null | undefined,
  locale: string,
  {
    fallback = DEFAULT_FALLBACK,
    minimumFractionDigits,
    maximumFractionDigits,
  }: PercentageOptions = {},
) {
  if (!isValidNumber(value)) {
    return fallback
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

export function formatDate(
  value: Date | number | null | undefined,
  locale: string,
  { fallback = DEFAULT_FALLBACK, dateStyle = 'medium' }: DateOptions = {},
) {
  if (!isValidDate(value)) {
    return fallback
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
  }).format(value)
}

export function formatDateTime(
  value: Date | number | null | undefined,
  locale: string,
  {
    fallback = DEFAULT_FALLBACK,
    dateStyle = 'medium',
    timeStyle = 'short',
  }: DateTimeOptions = {},
) {
  if (!isValidDate(value)) {
    return fallback
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
  }).format(value)
}
