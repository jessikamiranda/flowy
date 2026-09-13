import { expect, test } from '@playwright/test'

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
})

test.describe('login page', () => {
  test('renders the login page in English', async ({ page }) => {
    await page.goto('/en/login')

    await expect(
      page.getByRole('heading', {
        name: 'Welcome back!',
      }),
    ).toBeVisible()

    await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible()

    await expect(
      page.getByRole('button', {
        name: 'Log In',
      }),
    ).toBeVisible()
  })

  test('renders the login page in Portuguese', async ({ page }) => {
    await page.goto('/pt/login')

    await expect(
      page.getByRole('heading', {
        name: 'Bem-vindo de volta!',
      }),
    ).toBeVisible()

    await expect(page.getByLabel('E-mail', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Senha', { exact: true })).toBeVisible()
  })

  test('renders the login page in Spanish', async ({ page }) => {
    await page.goto('/es/login')

    await expect(
      page.getByRole('heading', {
        name: '¡Bienvenido de nuevo!',
      }),
    ).toBeVisible()

    await expect(page.getByLabel('Correo electrónico', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Contraseña', { exact: true })).toBeVisible()
  })

  test('toggles password visibility', async ({ page }) => {
    await page.goto('/en/login')

    const passwordInput = page.getByLabel('Password', {
      exact: true,
    })

    await passwordInput.fill('secret123')

    await expect(passwordInput).toHaveAttribute('type', 'password')

    await page
      .getByRole('button', {
        name: 'Show password',
      })
      .click()

    await expect(passwordInput).toHaveAttribute('type', 'text')

    await expect(passwordInput).toHaveValue('secret123')
  })

  test('shows validation errors for invalid form values', async ({ page }) => {
    await page.goto('/en/login')

    const emailInput = page.getByLabel('Email', {
      exact: true,
    })

    const passwordInput = page.getByLabel('Password', {
      exact: true,
    })

    await emailInput.fill('invalid-email')

    await page
      .getByRole('button', {
        name: 'Log In',
      })
      .click()

    await expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    await expect(passwordInput).toHaveAttribute('aria-invalid', 'true')

    await expect(page.getByText('Please enter a valid email address.')).toBeVisible()

    await expect(page.getByText('This field is required.')).toBeVisible()
  })
})
