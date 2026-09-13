'use client'

import { useCallback, useSyncExternalStore } from 'react'

import { appConfig, type ColorTheme } from '@/config/app'
import {
  COLOR_THEME_ATTRIBUTE,
  COLOR_THEME_CHANGE_EVENT,
  isColorTheme,
} from '@/theme/color-theme'

function getColorTheme() {
  if (typeof document === 'undefined') {
    return appConfig.theme.defaultColorTheme
  }

  const currentTheme = document.documentElement.getAttribute(COLOR_THEME_ATTRIBUTE)

  return isColorTheme(currentTheme) ? currentTheme : appConfig.theme.defaultColorTheme
}

function getServerColorTheme() {
  return appConfig.theme.defaultColorTheme
}

function subscribe(callback: () => void) {
  function handleThemeChange() {
    callback()
  }

  function handleStorage(event: StorageEvent) {
    if (event.key !== appConfig.theme.colorThemeStorageKey) {
      return
    }

    const nextTheme = isColorTheme(event.newValue)
      ? event.newValue
      : appConfig.theme.defaultColorTheme

    document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, nextTheme)

    callback()
  }

  window.addEventListener(COLOR_THEME_CHANGE_EVENT, handleThemeChange)

  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(COLOR_THEME_CHANGE_EVENT, handleThemeChange)

    window.removeEventListener('storage', handleStorage)
  }
}

export function useColorTheme() {
  const colorTheme = useSyncExternalStore(subscribe, getColorTheme, getServerColorTheme)

  const setColorTheme = useCallback((theme: ColorTheme) => {
    document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, theme)

    localStorage.setItem(appConfig.theme.colorThemeStorageKey, theme)

    window.dispatchEvent(new Event(COLOR_THEME_CHANGE_EVENT))
  }, [])

  return {
    colorTheme,
    colorThemes: appConfig.theme.colorThemes,
    setColorTheme,
  }
}
