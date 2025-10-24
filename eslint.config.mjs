import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional ignores:
    'node_modules/**',
    '.pnp.*',
    '.yarn/**',
    'dist/**',
    '.cache/**',
    '.parcel-cache/**',
    '.turbo/**',
    '.tailwindcss-cache',
    'coverage/**',
    '*.lcov',
    '*.log',
    'logs/**',
    '.env*',
    '.DS_Store',
    'Thumbs.db',
    '.vscode/**',
    '.idea/**',
    '.vs/**',
    '*.tmp',
    '*.temp',
    '.temp/**',
    '.tmp/**',
    '*.tgz',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.supabase/**',
    'test-results/**',
    'playwright-report/**',
    'blob-report/**',
    'playwright/.cache/**',
    'storybook-static/**',
    '.storybook-out/**',
    'public/**',
  ]),
]);

export default eslintConfig;
