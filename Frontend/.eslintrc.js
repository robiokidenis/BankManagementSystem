module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
  ],
  ignorePatterns: ['src/**/*.js'],
};
