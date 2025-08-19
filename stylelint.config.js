// stylelint.config.js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    // Отключаем неизвестные свойства (SCSS кастомные переменные)
    'property-no-unknown': null,

    // Не ругаться на CSS Modules :export
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export'],
      },
    ],

    // Разрешаем SCSS-атрулы
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

    // Дублирующиеся селекторы разрешаем
    'no-duplicate-selectors': null,

    // Отключаем проверку порядка селекторов (a vs a:visited)
    'no-descending-specificity': null,
  },
};
