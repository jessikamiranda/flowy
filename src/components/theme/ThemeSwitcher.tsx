'use client'

import { useTheme } from '@teispace/next-themes'
import { Monitor, Moon, Palette, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { appConfig, type ThemeMode } from '@/config/app'
import { useColorTheme } from '@/hooks/useColorTheme'
import { isColorTheme } from '@/theme/color-theme'
import { isThemeMode } from '@/theme/theme-mode'

const themeModes: {
  value: ThemeMode
  icon: typeof Sun
}[] = [
  {
    value: 'system',
    icon: Monitor,
  },
  {
    value: 'light',
    icon: Sun,
  },
  {
    value: 'dark',
    icon: Moon,
  },
]

export function ThemeSwitcher() {
  const t = useTranslations('general.themeSwitcher')

  const { theme, setTheme } = useTheme<ThemeMode>()

  const { colorTheme, colorThemes, setColorTheme } = useColorTheme()

  const currentMode = isThemeMode(theme) ? theme : appConfig.theme.defaultMode

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button type="button" variant="outline" size="sm" aria-label={t('label')} />
        }
      >
        <Palette aria-hidden="true" />
        <span className="hidden sm:inline">{t('label')}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('appearance')}</DropdownMenuLabel>

          <DropdownMenuRadioGroup
            value={currentMode}
            onValueChange={(value) => {
              if (!isThemeMode(value)) {
                return
              }

              setTheme(value)
            }}
          >
            {themeModes.map(({ value, icon: Icon }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon aria-hidden="true" />

                {t(`modes.${value}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('color')}</DropdownMenuLabel>

          <DropdownMenuRadioGroup
            value={colorTheme}
            onValueChange={(value) => {
              if (!isColorTheme(value)) {
                return
              }

              setColorTheme(value)
            }}
          >
            {colorThemes.map((value) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <span
                  aria-hidden="true"
                  data-color-theme={value}
                  className="size-3 rounded-full border border-black/10"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                  }}
                />

                {t(`colors.${value}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
