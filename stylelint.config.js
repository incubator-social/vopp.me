module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  ignoreFiles: ['**/*.stories.{js,jsx,ts,tsx}', '**/.storybook/**/*.{css,scss}', '**/stories/**/*.{css,scss}'],
  rules: {
    'comment-empty-line-before': null,
    'property-no-unknown': null,
    'no-duplicate-selectors': null,
    'no-descending-specificity': null,
    'keyframes-name-pattern': '^[a-zA-Z0-9-]+$',
    'custom-property-pattern': '^[a-z0-9-_]+$',
    'selector-class-pattern': [
      '^(?:[a-z][a-z0-9-]*|[a-z][a-zA-Z0-9]*|rdp-.*)$',
      {
        resolveNestedSelectors: true
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'global']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use', 'forward', 'mixin', 'include', 'extend', 'each', 'for', 'if', 'else']
      }
    ]
  }
};
