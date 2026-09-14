'use client'

import { useTheme } from '@teispace/next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSyncExternalStore } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { appConfig, type ThemeMode } from '@/config/app'
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

const emptySubscribe = () => () => {}

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

export function ThemeSwitcher() {
  const t = useTranslations('general.themeSwitcher')

  const { theme, setTheme } = useTheme<ThemeMode>()

  const mounted = useIsMounted()

  const currentMode = mounted && isThemeMode(theme) ? theme : appConfig.theme.defaultMode

  const CurrentModeIcon =
    currentMode === 'dark' ? Moon : currentMode === 'light' ? Sun : Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t('label')}
            className="size-9 rounded-xl border border-border/70 bg-card/70 text-muted-foreground shadow-none hover:bg-card hover:text-foreground"
          />
        }
      >
        {mounted ? (
          <CurrentModeIcon aria-hidden="true" className="size-4" />
        ) : (
          <span aria-hidden="true" className="size-4" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-xl">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
