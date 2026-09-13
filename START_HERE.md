# Start Here

This project was created from the **Next Frontend Starter**.

Use this checklist before starting product development.

## 1. Initialize the project

Run the project initializer:

```bash
npm run init
```

The initializer updates:

- project name
- package name
- project description
- product version (reset to `0.1.0`)
- theme storage keys
- `package.json`
- `package-lock.json`
- `src/config/app.ts`
- `README.md`

If `.env.example` exists and `.env.local` does not, it also creates `.env.local`.

Make sure you are using Node.js 24.15 or newer:

```bash
node -v
```

This starter includes a `.node-version` file for version managers such as fnm.

After initialization, install the dependencies:

```bash
npm install
```

---

## 2. Review the app configuration

Open:

```text
src/config/app.ts
```

Review:

```ts
appConfig.name
appConfig.description
appConfig.theme
appConfig.i18n
appConfig.auth
```

Most global starter settings should be changed here instead of being duplicated throughout the application.

The theme configuration includes:

```ts
appConfig.theme.defaultMode
appConfig.theme.modeStorageKey
appConfig.theme.colorThemes
appConfig.theme.defaultColorTheme
appConfig.theme.colorThemeStorageKey
```

---

## 3. Review internationalization

The starter includes:

```text
en
pt
es
```

The default locale is:

```text
en
```

The locale configuration lives in:

```text
src/config/app.ts
src/i18n/routing.ts
src/i18n/loadMessages.ts
src/messages/
```

If the project does not need one of the existing locales:

1. Remove it from `appConfig.i18n.locales`
2. Remove its imports and mapping from `src/i18n/loadMessages.ts`
3. Delete the corresponding folder from `src/messages/`
4. Update any locale-specific E2E tests
5. Run `npm run validate`

If you add a new locale, make the equivalent changes in the opposite direction.

---

## 4. Replace project branding

Review and replace:

```text
src/app/favicon.ico
```

If the project uses a different authentication image, update:

```ts
appConfig.auth.imageUrl
```

in:

```text
src/config/app.ts
```

Project name and description should already have been configured by `npm run init`.

---

## 5. Review theme and design tokens

Global design tokens and color palettes live in:

```text
src/app/globals.css
```

The starter separates **appearance** from **color theme**.

Appearance supports:

```text
light
dark
system
```

Color themes include:

```text
neutral
blue
violet
rose
emerald
```

Theme-related configuration and infrastructure live in:

```text
src/config/app.ts
src/providers/ThemeProvider.tsx
src/hooks/useColorTheme.ts
src/theme/
src/components/theme/
```

The appearance mode is handled independently from the color palette.

A rendered page may therefore use combinations such as:

```text
light + rose
dark + blue
system + emerald
```

Prefer semantic design tokens such as:

```text
background
foreground
primary
primary-foreground
secondary
muted
accent
border
input
ring
sidebar
```

instead of hardcoding colors inside individual components.

---

## 6. Review authentication UI

The starter includes authentication UI as a reference implementation for:

```text
React Hook Form
Zod
internationalization
accessible form fields
unit tests
integration tests
E2E tests
```

Relevant files:

```text
src/app/[locale]/(auth)/
src/features/auth/
e2e/login.spec.ts
```

No authentication backend is included.

If the project does not require authentication, remove the auth routes, auth feature, and related tests.

If the project requires authentication, integrate the chosen backend or authentication provider inside the product project rather than inside the starter.

---

## 7. Review navigation

Navigation configuration lives in:

```text
src/config/navigation.ts
```

The starter includes only a generic Dashboard entry.

The application shell lives in:

```text
src/components/layout/app-shell/
```

It provides:

```text
responsive sidebar
mobile navigation
collapsed sidebar mode
active navigation state
application header
theme switcher
```

Add product-specific navigation only after the product routes exist.

Avoid putting product-specific entities into the starter itself.

---

## 8. Configure environment variables

Add required variables to:

```text
.env.example
```

Add real local values to:

```text
.env.local
```

Never commit `.env.local` or secret values.

Variables prefixed with:

```text
NEXT_PUBLIC_
```

are exposed to the browser and must not contain secrets.

---

## 9. Add product-specific dependencies only when needed

The starter intentionally does not include product-specific tools such as:

```text
Supabase
Firebase
Stripe
TanStack Query
Zustand
charts
drag and drop
file uploads
analytics
```

Install them only when the project actually requires them.

Avoid adding dependencies simply because they may be useful later.

---

## 10. Understand the project structure

```text
src/
├── app/
│   └── [locale]/
│       ├── (public)/
│       ├── (auth)/
│       └── (app)/
├── components/
│   ├── data-table/
│   ├── dialogs/
│   ├── filters/
│   ├── form/
│   ├── layout/
│   ├── states/
│   ├── theme/
│   └── ui/
├── config/
├── features/
├── hooks/
├── i18n/
├── lib/
├── messages/
├── providers/
├── test/
├── theme/
├── types/
└── utils/
```

Use:

```text
features/
```

for domain-specific functionality.

Use:

```text
components/
```

for reusable UI that is not owned by a single product feature.

Use:

```text
config/
```

for application-wide configuration such as app settings and navigation.

Use:

```text
hooks/
```

for reusable application hooks.

Use:

```text
lib/
```

for shared utilities and infrastructure with a clear responsibility.

Use:

```text
theme/
```

for theme-specific infrastructure that is not a UI component.

Avoid creating abstractions before the project actually needs them.

---

## 11. Reusable starter infrastructure

The starter includes reusable infrastructure for common frontend application needs.

### Data tables

```text
src/components/data-table/
```

Includes support for:

```text
client-side mode
server-side mode
sorting
pagination
global search
column filters
URL query state
column visibility
column resizing
keyboard-accessible column resizing
inline editing
row selection
bulk actions
filtered record counts
total record counts
```

When using server-side mode:

- `rowCount` represents the number of records after filtering and is used for pagination.
- `totalRowCount` represents the overall number of records before filtering and is used for record summaries.

The starter does not include a backend implementation.

### Forms

```text
src/components/form/
```

Includes reusable React Hook Form-compatible fields such as:

```text
FormInput
FormSelect
FormTextarea
FormCheckbox
FormSwitch
```

### Page layout

```text
src/components/layout/
```

Includes:

```text
AppShell
responsive navigation
PageContainer
PageHeader
breadcrumbs
```

### Application states

```text
src/components/states/
```

Includes reusable:

```text
empty states
error states
loading states
```

### Filters

```text
src/components/filters/
```

Includes reusable search and filtering components that can be used independently from DataTable.

### Confirmation dialogs

```text
src/components/dialogs/
```

Includes reusable confirmation flows with support for asynchronous actions and destructive operations.

---

## 12. Run the validation pipeline

Before starting product development, run:

```bash
npm run validate
```

This checks:

```text
Prettier
ESLint
TypeScript
Vitest
Next.js production build
Playwright E2E tests
```

The Playwright suite also includes responsive checks and automated accessibility testing with Axe across the supported color themes in light and dark modes.

Do not continue with a broken starter baseline.

---

## 13. Remove starter-only setup

The starter includes a public component showcase at:

```text
src/app/[locale]/(public)/components/
```

It exists only to demonstrate and validate the reusable components included with the starter.

Before the first product commit, remove the starter-only setup:

```bash
rm START_HERE.md

rm scripts/init-project.mjs

rm -rf 'src/app/[locale]/(public)/components'

npm pkg delete scripts.init
```

If the `scripts` directory is now empty:

```bash
rmdir scripts
```

Also remove the `showcase` translation namespace from:

```text
src/messages/en/general.json
src/messages/pt/general.json
src/messages/es/general.json
```

Then run:

```bash
npm run validate
```

From that point onward, the repository should contain only the application itself and its reusable development infrastructure.

---

## Important technical note

React Compiler is intentionally disabled in this starter.

During browser testing, enabling it caused inconsistent React Hook Form field-state updates.

The non-compiled configuration produced the expected behavior across unit, integration, and end-to-end tests.

Do not enable React Compiler without rerunning the full validation pipeline.

---

## Starter principle

The starter should contain infrastructure that is reusable across many projects.

Product-specific decisions belong in the product.

When deciding whether something should be added to the starter, ask:

> Would I realistically want this in most new frontend projects?

If the answer is no, keep it out of the starter.
