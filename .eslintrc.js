module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-use-before-define': 0,
  },
};
