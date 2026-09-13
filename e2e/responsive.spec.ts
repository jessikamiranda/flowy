import { expect, test } from '@playwright/test'

test.describe('mobile layout', () => {
  test.use({
    viewport: {
      width: 390,
      height: 844,
    },
  })

  test('components page does not overflow the viewport', async ({ page }) => {
    await page.goto('/en/components')

    const hasPageOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })

    expect(hasPageOverflow).toBe(false)
  })

  test('mobile navigation opens and closes', async ({ page }) => {
    await page.goto('/en/dashboard')

    await page
      .getByRole('button', {
        name: 'Toggle navigation',
      })
      .click()

    const navigation = page.getByRole('dialog')

    await expect(navigation).toBeVisible()

    await expect(
      navigation.getByRole('link', {
        name: 'Dashboard',
      }),
    ).toBeVisible()

    await navigation
      .getByRole('link', {
        name: 'Dashboard',
      })
      .click()

    await expect(navigation).not.toBeVisible()
  })
})
