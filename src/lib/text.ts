export function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

export function normalizeSearchText(value: string) {
  return normalizeWhitespace(value)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase()
}

export function emptyStringToNull(value: string | null | undefined) {
  const normalized = value?.trim() ?? ''

  return normalized.length > 0 ? normalized : null
}
