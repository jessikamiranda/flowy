import { access, copyFile, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { createInterface } from 'node:readline/promises'

const root = process.cwd()

const INITIAL_PRODUCT_VERSION = '0.1.0'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function titleFromSlug(value) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function toTsString(value) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function ask(question, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : ''
  const answer = await rl.question(`${question}${suffix}: `)

  return answer.trim() || defaultValue
}

async function updatePackageFiles(packageName) {
  const packageJsonPath = path.join(root, 'package.json')
  const packageLockPath = path.join(root, 'package-lock.json')

  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))

  packageJson.name = packageName
  packageJson.version = INITIAL_PRODUCT_VERSION

  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)

  if (!(await fileExists(packageLockPath))) {
    return
  }

  const packageLock = JSON.parse(await readFile(packageLockPath, 'utf8'))

  packageLock.name = packageName
  packageLock.version = INITIAL_PRODUCT_VERSION

  if (packageLock.packages?.['']) {
    packageLock.packages[''].name = packageName
    packageLock.packages[''].version = INITIAL_PRODUCT_VERSION
  }

  await writeFile(packageLockPath, `${JSON.stringify(packageLock, null, 2)}\n`)
}

async function updateAppConfig({ name, description, packageName }) {
  const configPath = path.join(root, 'src/config/app.ts')

  let content = await readFile(configPath, 'utf8')

  content = content.replace(/name:\s*['"][^'"]*['"]/, `name: ${toTsString(name)}`)

  content = content.replace(
    /description:\s*['"][^'"]*['"]/,
    `description: ${toTsString(description)}`,
  )

  content = content.replace(
    /modeStorageKey:\s*['"][^'"]*['"]/,
    `modeStorageKey: ${toTsString(`${packageName}-theme-mode`)}`,
  )

  content = content.replace(
    /colorThemeStorageKey:\s*['"][^'"]*['"]/,
    `colorThemeStorageKey: ${toTsString(`${packageName}-theme-color`)}`,
  )

  await writeFile(configPath, content)
}

async function updateReadme({ name, description }) {
  const readmePath = path.join(root, 'README.md')

  const content = `# ${name}

${description}

## Getting Started

Install the dependencies:

\`\`\`bash
npm install
\`\`\`

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Run the project quality checks:

\`\`\`bash
npm run check
\`\`\`

Run the complete validation pipeline:

\`\`\`bash
npm run validate
\`\`\`
`

  await writeFile(readmePath, content)
}

async function createLocalEnv() {
  const examplePath = path.join(root, '.env.example')
  const localPath = path.join(root, '.env.local')

  const hasExample = await fileExists(examplePath)
  const hasLocal = await fileExists(localPath)

  if (hasExample && !hasLocal) {
    await copyFile(examplePath, localPath)
    return true
  }

  return false
}

async function main() {
  const folderName = path.basename(root)

  const defaultName = titleFromSlug(folderName)
  const name = await ask('Project name', defaultName)

  const defaultPackageName = slugify(name)
  const packageName = await ask('Package name', defaultPackageName)

  const description = await ask('Description', 'A modern web application.')

  if (!name) {
    throw new Error('Project name cannot be empty.')
  }

  if (!packageName) {
    throw new Error('Package name cannot be empty.')
  }

  if (packageName !== slugify(packageName)) {
    throw new Error(
      'Package name must contain only lowercase letters, numbers, and hyphens.',
    )
  }

  await updatePackageFiles(packageName)

  await updateAppConfig({
    name,
    description,
    packageName,
  })

  await updateReadme({
    name,
    description,
  })

  const envCreated = await createLocalEnv()

  console.log('\nProject initialized successfully.\n')
  console.log(`Name: ${name}`)
  console.log(`Package: ${packageName}`)
  console.log(`Version: ${INITIAL_PRODUCT_VERSION}`)
  console.log(`Theme mode storage key: ${packageName}-theme-mode`)

  console.log(`Color theme storage key: ${packageName}-theme-color`)

  if (envCreated) {
    console.log('.env.local created from .env.example')
  }

  console.log('\nNext steps:')
  console.log('1. Review src/config/app.ts')
  console.log('2. Replace src/app/favicon.ico')
  console.log('3. Review the enabled locales')
  console.log('4. Run npm install')
  console.log('5. Run npm run validate')
}

try {
  await main()
} catch (error) {
  console.error('\nFailed to initialize project.')

  if (error instanceof Error) {
    console.error(error.message)
  }

  process.exitCode = 1
} finally {
  rl.close()
}
