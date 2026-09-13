import { expect, test } from '@playwright/test'

const routes = ['/en/dashboard', '/en/clients', '/en/projects', '/en/tasks'] as const

test.describe('mobile layout', () => {
  test.use({
    viewport: {
      width: 390,
      height: 844,
    },
  })

  for (const route of routes) {
    test(`${route} does not overflow the viewport`, async ({ page }) => {
      await page.goto(route)

      const hasPageOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth
      })

      expect(hasPageOverflow).toBe(false)
    })
  }

  test('mobile navigation opens navigates and closes', async ({ page }) => {
    await page.goto('/en/dashboard')

    await page
      .getByRole('button', {
        name: 'Toggle navigation',
      })
      .click()

    const navigation = page.getByRole('dialog')

    await expect(navigation).toBeVisible()

    await navigation
      .getByRole('link', {
        name: 'Clients',
      })
      .click()

    await expect(page).toHaveURL(/\/en\/clients$/)

    await expect(navigation).not.toBeVisible()
  })
})
