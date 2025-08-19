module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'property-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'use',
          'forward',
          'mixin',
          'include',
          'extend',
          'each',
          'for',
          'if',
          'else',
        ],
      },
    ],
    'no-duplicate-selectors': null,
    'no-descending-specificity': null,
  },
};
