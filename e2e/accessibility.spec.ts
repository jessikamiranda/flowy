import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { appConfig, type ColorTheme, type ThemeMode } from '@/config/app'

const routes = ['/en/components', '/en/login', '/en/dashboard'] as const

const colorThemes = appConfig.theme.colorThemes

const modes = ['light', 'dark'] as const satisfies readonly ThemeMode[]

type Mode = (typeof modes)[number]

async function disableVisualTransitions(page: Page) {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        transition-property: none !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
      }
    `,
  })
}

async function waitForInitialAnimations(page: Page, route: string) {
  if (route === '/en/login') {
    await expect(page.locator('.relative.flex.min-h-screen')).toHaveCSS('opacity', '1')
  }
}

async function applyTheme(page: Page, colorTheme: ColorTheme, mode: Mode) {
  const html = page.locator('html')

  await html.evaluate(
    (element, { colorTheme, mode }) => {
      element.setAttribute('data-color-theme', colorTheme)

      element.classList.toggle('dark', mode === 'dark')

      element.classList.toggle('light', mode === 'light')

      element.style.colorScheme = mode
    },
    {
      colorTheme,
      mode,
    },
  )

  await expect(html).toHaveAttribute('data-color-theme', colorTheme)

  await expect(html).toHaveClass(new RegExp(`\\b${mode}\\b`))

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve()
          })
        })
      }),
  )
}

for (const route of routes) {
  test(`${route} has no detectable WCAG A/AA violations across themes`, async ({
    page,
  }) => {
    test.setTimeout(60_000)

    await page.goto(route)

    await waitForInitialAnimations(page, route)

    await disableVisualTransitions(page)

    for (const mode of modes) {
      for (const colorTheme of colorThemes) {
        await applyTheme(page, colorTheme, mode)

        const results = await new AxeBuilder({
          page,
        })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()

        expect.soft(results.violations, `${route} · ${mode} · ${colorTheme}`).toEqual([])
      }
    }
  })
}

test('primary button hover has accessible contrast across themes', async ({ page }) => {
  await page.goto('/en/components')

  await disableVisualTransitions(page)

  const primaryButton = page.locator('button.bg-primary.text-primary-foreground').first()

  await expect(primaryButton).toBeVisible()

  for (const mode of modes) {
    for (const colorTheme of colorThemes) {
      await applyTheme(page, colorTheme, mode)

      await primaryButton.hover()

      const results = await new AxeBuilder({
        page,
      })
        .include('button.bg-primary.text-primary-foreground')
        .withRules(['color-contrast'])
        .analyze()

      expect
        .soft(results.violations, `primary hover · ${mode} · ${colorTheme}`)
        .toEqual([])
    }
  }
})
