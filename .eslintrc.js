module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: ["plugin:@typescript-eslint/recommended"],
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json']
    },
    rules: {
      semi: [1, 'always'],
      'no-extra-semi': 1,
      'no-console': 2,
      'no-trailing-spaces': 2
    }
  };
