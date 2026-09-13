import enGeneral from '@/messages/en/general.json'
import esGeneral from '@/messages/es/general.json'
import ptGeneral from '@/messages/pt/general.json'

import type { Messages } from './messages'
import type { Locale } from './routing'

const messages = {
  en: {
    general: enGeneral,
  },
  pt: {
    general: ptGeneral,
  },
  es: {
    general: esGeneral,
  },
} satisfies Record<Locale, Messages>

export function loadMessages(locale: Locale): Messages {
  return messages[locale]
}
