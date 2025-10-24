module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'next/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ],
  rules: {
    // Add custom rules here if needed
  },
}
