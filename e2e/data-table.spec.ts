import { expect, test } from '@playwright/test'

test.describe('data table showcase', () => {
  test('hydrates filters from the URL', async ({ page }) => {
    await page.goto('/en/components?status=active')

    await expect(page.getByLabel('Filter by status')).toContainText('Active')

    await expect(page.getByText('Olivia Martin')).toBeVisible()

    await expect(page.getByText('Jackson Lee')).not.toBeVisible()
  })

  test('syncs global search with the URL', async ({ page }) => {
    await page.goto('/en/components')

    await page.getByPlaceholder('Search by name or email...').fill('olivia')

    await expect(page).toHaveURL(/[?&]q=olivia(?:&|$)/)

    await expect(page.getByText('Olivia Martin')).toBeVisible()

    await expect(page.getByText('Jackson Lee')).not.toBeVisible()
  })

  test('syncs sorting with the URL', async ({ page }) => {
    await page.goto('/en/components')

    await page
      .getByRole('button', {
        name: 'Name',
        exact: true,
      })
      .click()

    await expect(page).toHaveURL(/[?&]sort=name(?:&|$)/)

    await expect(page).toHaveURL(/[?&]order=asc(?:&|$)/)
  })

  test('edits text and select cells', async ({ page }) => {
    await page.goto('/en/components')

    await page.getByLabel('Edit name for Olivia Martin').click()

    const nameInput = page.getByLabel('Edit name for Olivia Martin')

    await nameInput.fill('Olivia Updated')
    await nameInput.press('Enter')

    await expect(page.getByText('Olivia Updated')).toBeVisible()

    const status = page.getByLabel('Edit status for Olivia Updated')

    await status.click()

    await page
      .getByRole('option', {
        name: 'Inactive',
      })
      .click()

    await expect(status).toContainText('Inactive')
  })

  test('toggles column visibility', async ({ page }) => {
    await page.goto('/en/components')

    await expect(
      page.getByRole('columnheader', {
        name: 'Email',
      }),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: 'Columns',
      })
      .click()

    await page
      .getByRole('menuitemcheckbox', {
        name: 'Email',
      })
      .click()

    await expect(
      page.getByRole('columnheader', {
        name: 'Email',
      }),
    ).not.toBeVisible()
  })

  test('runs bulk actions on selected rows', async ({ page }) => {
    await page.goto('/en/components')

    await page.getByLabel('Select row').first().click()

    await expect(page.getByText('1 row selected')).toBeVisible()

    await page
      .getByRole('button', {
        name: 'Set inactive',
      })
      .click()

    await expect(page.getByText('1 row selected')).not.toBeVisible()

    await expect(page.getByLabel('Edit status for Olivia Martin')).toContainText(
      'Inactive',
    )
  })

  test('shows total and filtered record counts', async ({ page }) => {
    await page.goto('/en/components?pageSize=5')

    await expect(page.getByText('Showing 1–5 of 8 records')).toBeVisible()

    await page.getByPlaceholder('Search by name or email...').fill('Olivia')

    await expect(
      page.getByText('Showing 1–1 of 1 filtered record · 8 records total'),
    ).toBeVisible()
  })
})
