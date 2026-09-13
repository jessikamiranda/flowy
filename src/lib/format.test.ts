import { describe, expect, it } from 'vitest'

import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercentage,
} from './format'

describe('format utilities', () => {
  it('formats currency', () => {
    expect(formatCurrency(1250.5, 'en-US', 'USD')).toBe('$1,250.50')
  })

  it('formats numbers', () => {
    expect(formatNumber(1250.5, 'en-US')).toBe('1,250.5')
  })

  it('formats percentages', () => {
    expect(formatPercentage(0.42, 'en-US')).toBe('42%')
  })

  it('formats dates', () => {
    const date = new Date(2026, 8, 12, 10, 30)

    expect(formatDate(date, 'en-US')).toBe('Sep 12, 2026')
  })

  it('formats date and time', () => {
    const date = new Date(2026, 8, 12, 10, 30)

    expect(formatDateTime(date, 'en-US')).toMatch(/Sep 12, 2026.*10:30/)
  })

  it('returns a fallback for invalid values', () => {
    expect(formatCurrency(null, 'en-US', 'USD')).toBe('—')

    expect(formatNumber(Number.NaN, 'en-US')).toBe('—')

    expect(formatDate(new Date('invalid'), 'en-US')).toBe('—')
  })

  it('supports a custom fallback', () => {
    expect(
      formatNumber(null, 'en-US', {
        fallback: 'N/A',
      }),
    ).toBe('N/A')
  })
})
