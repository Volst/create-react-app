// Inspired by https://github.com/facebookincubator/create-react-app/blob/master/packages/eslint-config-react-app
// But adjusted for TSLint and with a few changes.

'use strict';

// The TypeScript browser environment defines all browser globals as valid,
// even though most people don't know some of them exist (e.g. `name` or `status`).
// This is dangerous as it hides accidentally undefined variables.
// We blacklist the globals that we deem potentially confusing.
// To use them, explicitly reference them, e.g. `window.name` or `window.status`.
const restrictedGlobals = [
  'addEventListener',
  'blur',
  'close',
  'closed',
  'confirm',
  'defaultStatus',
  'defaultstatus',
  'event',
  'external',
  'find',
  'focus',
  'frameElement',
  'frames',
  'history',
  'innerHeight',
  'innerWidth',
  'length',
  'location',
  'locationbar',
  'menubar',
  'moveBy',
  'moveTo',
  'name',
  'onblur',
  'onerror',
  'onfocus',
  'onload',
  'onresize',
  'onunload',
  'open',
  'opener',
  'opera',
  'outerHeight',
  'outerWidth',
  'pageXOffset',
  'pageYOffset',
  'parent',
  'print',
  'removeEventListener',
  'resizeBy',
  'resizeTo',
  'screen',
  'screenLeft',
  'screenTop',
  'screenX',
  'screenY',
  'scroll',
  'scrollbars',
  'scrollBy',
  'scrollTo',
  'scrollX',
  'scrollY',
  'self',
  'status',
  'statusbar',
  'stop',
  'toolbar',
  'top',
  'Text',
  'Notification',
];

module.exports = {
  defaultSeverity: 'warning',
  rulesDirectory: ['tslint-react/rules', './rules'],
  rules: {
    'no-restricted-globals': [true].concat(restrictedGlobals),
    'class-name': true,
    'label-position': true,
    'no-any': false,
    'no-arg': true,
    'no-bitwise': true,
    'no-construct': true,
    'no-eval': true,
    'no-sparse-arrays': true,
    'no-unused-expression': [true, 'allow-fast-null-checks'],
    'no-conditional-assignment': true,
    'no-switch-case-fall-through': true,
    'no-string-throw': true,
    'no-invalid-template-strings': true,
    'prefer-template': true,
    'switch-default': true,
    'prefer-const': [true, { destructuring: 'all' }],
    'new-parens': true,
    'use-isnan': true,
    'triple-equals': [true, 'allow-null-check'],
    typedef: [true, 'parameter', 'property-declaration'],
    'variable-name': [true, 'ban-keywords'],
    'jsx-key': true,
    'jsx-no-string-ref': true,
  },
};
