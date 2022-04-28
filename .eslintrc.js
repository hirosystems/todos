const stacksConfig = require('@stacks/eslint-config');

const { parser, ...rest } = stacksConfig;

module.exports = {
  ...rest,
  plugins: ['import', 'prettier'],
  extends: ['react-app'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  rules: {
    ...rest.rules,
    "@typescript-eslint/no-non-null-assertion": [0],
    "@typescript-eslint/array-type": [0]
  }
}