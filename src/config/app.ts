export const appConfig = {
  name: 'Flowy',
  description: 'A modern client and project operations platform for teams',

  theme: {
    defaultMode: 'system',
    modeStorageKey: 'flowy-theme-mode',

    colorThemes: ['neutral', 'blue', 'violet', 'rose', 'emerald'],

    defaultColorTheme: 'violet',
    colorThemeStorageKey: 'flowy-theme-color',
  },

  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
    localePrefix: 'always',
  },

  auth: {
    imageUrl:
      'https://images.unsplash.com/photo-1645786708004-fbbd4b0a71e5?q=80&w=654&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
} as const

export type ColorTheme = (typeof appConfig.theme.colorThemes)[number]

export type ThemeMode = 'light' | 'dark' | 'system'
