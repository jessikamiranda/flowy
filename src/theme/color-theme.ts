import { appConfig, type ColorTheme } from '@/config/app'

export const COLOR_THEME_ATTRIBUTE = 'data-color-theme'

export const COLOR_THEME_CHANGE_EVENT = 'app:color-theme-change'

export function isColorTheme(value: string | null | undefined): value is ColorTheme {
  return appConfig.theme.colorThemes.some((theme) => theme === value)
}
