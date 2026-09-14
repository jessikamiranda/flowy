import { expect, test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  const email = process.env.E2E_TEST_EMAIL
  const password = process.env.E2E_TEST_PASSWORD

  if (!email || !password) {
    throw new Error('E2E_TEST_EMAIL and E2E_TEST_PASSWORD must be defined.')
  }

  await page.goto('/en/login')

  await page
    .getByLabel('Email', {
      exact: true,
    })
    .fill(email)

  await page
    .getByLabel('Password', {
      exact: true,
    })
    .fill(password)

  await page
    .getByRole('button', {
      name: 'Log In',
    })
    .click()

  await expect(page).toHaveURL(/\/en\/dashboard$/)

  await page.waitForURL(/\/dashboard\/?$/, {
    timeout: 10_000,
  })

  await expect(page).toHaveURL(/\/dashboard\/?$/)

  await page.context().storageState({
    path: authFile,
  })
})
