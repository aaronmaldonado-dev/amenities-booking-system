// https://eslint.org/docs/user-guide/configuring/
module.exports = {
  env: {
    browser: false,
    es2020: true,
    node: true,
  },

  // INFO: https://github.com/typescript-eslint/typescript-eslint
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
  },

  // The order of these matters
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],

  plugins: [
    // INFO: https://typescript-eslint.io/
    '@typescript-eslint',

    // INFO: https://github.com/lydell/eslint-plugin-simple-import-sort
    'simple-import-sort',

    // INFO: https://prettier.io/
    'prettier',
  ],

  rules: {
    // eslint-plugin-simple-import-sort
    // INFO: https://github.com/lydell/eslint-plugin-simple-import-sort
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // INFO: https://github.com/prettier/eslint-plugin-prettier#installation
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
