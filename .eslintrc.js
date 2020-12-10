module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    'react/state-in-constructor': 0,
    'react/destructuring-assignment': 0,
    'arrow-parens': ['error', 'as-needed'],
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
