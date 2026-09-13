import { defineRouting } from 'next-intl/routing'

import { appConfig } from '@/config/app'

export const routing = defineRouting({
  locales: appConfig.i18n.locales,
  defaultLocale: appConfig.i18n.defaultLocale,
  localePrefix: appConfig.i18n.localePrefix,
})

export type Locale = (typeof routing.locales)[number]
