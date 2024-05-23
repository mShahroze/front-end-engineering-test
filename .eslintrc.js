// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Your custom rules here
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
