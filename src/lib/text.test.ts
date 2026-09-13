import { describe, expect, it } from 'vitest'

import { emptyStringToNull, normalizeSearchText, normalizeWhitespace } from './text'

describe('text utilities', () => {
  it('normalizes whitespace', () => {
    expect(normalizeWhitespace('  Jessika    Miranda  ')).toBe('Jessika Miranda')
  })

  it('normalizes search text', () => {
    expect(normalizeSearchText('  Recuperação FÍSCAL  ')).toBe('recuperacao fiscal')
  })

  it('converts empty strings to null', () => {
    expect(emptyStringToNull('')).toBeNull()

    expect(emptyStringToNull('   ')).toBeNull()

    expect(emptyStringToNull(null)).toBeNull()

    expect(emptyStringToNull(undefined)).toBeNull()
  })

  it('returns trimmed non-empty strings', () => {
    expect(emptyStringToNull('  hello  ')).toBe('hello')
  })
})
