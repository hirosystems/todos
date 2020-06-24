const blockstackConfig = require('@blockstack/eslint-config');

const { parser, ...rest } = blockstackConfig;

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