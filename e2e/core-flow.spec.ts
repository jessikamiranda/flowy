import { expect, test } from '@playwright/test'

test.describe('core product flow', () => {
  test('creates and manages a client project and task', async ({ page }) => {
    const suffix = Date.now()

    const clientName = `E2E Contact ${suffix}`
    const companyName = `E2E Company ${suffix}`
    const projectName = `E2E Project ${suffix}`
    const taskTitle = `E2E Task ${suffix}`

    //
    // Client
    //

    await page.goto('/en/clients')

    await page
      .getByRole('button', {
        name: 'New client',
        exact: true,
      })
      .first()
      .click()

    await page
      .getByLabel('Contact name', {
        exact: true,
      })
      .fill(clientName)

    await page
      .getByLabel('Company', {
        exact: true,
      })
      .fill(companyName)

    await page
      .getByLabel('Email', {
        exact: true,
      })
      .fill(`e2e-${suffix}@example.com`)

    await page
      .getByLabel('Phone', {
        exact: true,
      })
      .fill('+1 555 123 4567')

    await page
      .getByRole('button', {
        name: 'Create client',
      })
      .click()

    await expect(page.getByText('Client created successfully.')).toBeVisible()

    await page.getByPlaceholder('Search clients...').fill(companyName)

    const clientRow = page.getByRole('row').filter({
      hasText: companyName,
    })

    await expect(clientRow).toBeVisible()
    await expect(clientRow).toContainText(clientName)

    //
    // Project
    //

    await page.goto('/en/projects')

    await page
      .getByRole('button', {
        name: 'New project',
        exact: true,
      })
      .first()
      .click()

    await page
      .getByLabel('Client', {
        exact: true,
      })
      .click()

    await page
      .getByRole('option', {
        name: companyName,
        exact: true,
      })
      .click()

    await page
      .getByLabel('Project name', {
        exact: true,
      })
      .fill(projectName)

    await page
      .getByLabel('Description', {
        exact: true,
      })
      .fill('Project created by the Flowy E2E test.')

    await page
      .getByRole('button', {
        name: 'Create project',
      })
      .click()

    await expect(page.getByText('Project created successfully.')).toBeVisible()

    await page.getByPlaceholder('Search projects...').fill(projectName)

    const projectRow = page.getByRole('row').filter({
      hasText: projectName,
    })

    await expect(projectRow).toBeVisible()
    await expect(projectRow).toContainText(companyName)

    //
    // Task
    //

    await page.goto('/en/tasks')

    await page
      .getByRole('button', {
        name: 'New task',
        exact: true,
      })
      .first()
      .click()

    await page
      .getByLabel('Project', {
        exact: true,
      })
      .click()

    await page
      .getByRole('option', {
        name: `${projectName} · ${companyName}`,
        exact: true,
      })
      .click()

    await page
      .getByLabel('Task title', {
        exact: true,
      })
      .fill(taskTitle)

    await page
      .getByLabel('Description', {
        exact: true,
      })
      .fill('Task created by the Flowy E2E test.')

    await page
      .getByLabel('Due date', {
        exact: true,
      })
      .click()

    await page
      .getByRole('button', {
        name: 'Tomorrow',
        exact: true,
      })
      .click()

    await page
      .getByRole('button', {
        name: 'Create task',
      })
      .click()

    await expect(page.getByText('Task created successfully.')).toBeVisible()

    await page.getByPlaceholder('Search tasks...').fill(taskTitle)

    let taskRow = page.getByRole('row').filter({
      hasText: taskTitle,
    })

    await expect(taskRow).toBeVisible()
    await expect(taskRow).toContainText(projectName)

    //
    // Inline editing
    //

    const statusSelect = taskRow.getByLabel(`Change status for ${taskTitle}`)

    await statusSelect.click()

    await page
      .getByRole('option', {
        name: 'In progress',
        exact: true,
      })
      .click()

    await expect(statusSelect).toContainText('In progress')

    const prioritySelect = taskRow.getByLabel(`Change priority for ${taskTitle}`)

    await prioritySelect.click()

    await page
      .getByRole('option', {
        name: 'High',
        exact: true,
      })
      .click()

    await expect(prioritySelect).toContainText('High')

    //
    // Persistence
    //

    await page.reload()

    await page.getByPlaceholder('Search tasks...').fill(taskTitle)

    taskRow = page.getByRole('row').filter({
      hasText: taskTitle,
    })

    await expect(taskRow.getByLabel(`Change status for ${taskTitle}`)).toContainText(
      'In progress',
    )

    await expect(taskRow.getByLabel(`Change priority for ${taskTitle}`)).toContainText(
      'High',
    )

    //
    // Dashboard
    //

    await page.goto('/en/dashboard')

    await expect(
      page.getByText(projectName, {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText(taskTitle, {
        exact: true,
      }),
    ).toBeVisible()

    //
    // Delete task
    //

    await page.goto('/en/tasks')

    await page.getByPlaceholder('Search tasks...').fill(taskTitle)

    taskRow = page.getByRole('row').filter({
      hasText: taskTitle,
    })

    await taskRow
      .getByRole('button', {
        name: `Open actions for ${taskTitle}`,
      })
      .click()

    await page
      .getByRole('menuitem', {
        name: 'Delete',
      })
      .click()

    await page
      .getByRole('button', {
        name: 'Delete task',
      })
      .click()

    await expect(page.getByText('Task deleted successfully.')).toBeVisible()

    await expect(
      page.getByRole('row').filter({
        hasText: taskTitle,
      }),
    ).not.toBeVisible()

    //
    // Delete project
    //

    await page.goto('/en/projects')

    await page.getByPlaceholder('Search projects...').fill(projectName)

    const projectRowToDelete = page.getByRole('row').filter({
      hasText: projectName,
    })

    await projectRowToDelete
      .getByRole('button', {
        name: `Open actions for ${projectName}`,
      })
      .click()

    await page
      .getByRole('menuitem', {
        name: 'Delete',
      })
      .click()

    await page
      .getByRole('button', {
        name: 'Delete project',
      })
      .click()

    await expect(page.getByText('Project deleted successfully.')).toBeVisible()

    //
    // Delete client
    //

    await page.goto('/en/clients')

    await page.getByPlaceholder('Search clients...').fill(companyName)

    const clientRowToDelete = page.getByRole('row').filter({
      hasText: companyName,
    })

    await clientRowToDelete
      .getByRole('button', {
        name: `Open actions for ${clientName}`,
      })
      .click()

    await page
      .getByRole('menuitem', {
        name: 'Delete',
      })
      .click()

    await page
      .getByRole('button', {
        name: 'Delete client',
      })
      .click()

    await expect(page.getByText('Client deleted successfully.')).toBeVisible()

    await expect(
      page.getByRole('row').filter({
        hasText: companyName,
      }),
    ).not.toBeVisible()
  })
})
