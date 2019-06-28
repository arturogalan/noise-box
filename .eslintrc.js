// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  plugins: [],
  // add your custom rules here
  'rules': {
    // Possible Errors
    // http://eslint.org/docs/rules/#possible-errors
    'no-console': 'off',
    'no-cond-assign': 0, // eslint:recommended
    'no-constant-condition': 2,
    'no-control-regex': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-empty-character-class': 2,
    'no-extra-parens': 2,
    'no-extra-semi': 2,
    'no-negated-in-lhs': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2, // eslint:recommended
    'no-unexpected-multiline': 2, // eslint:recommended
    'no-unreachable': 2,
    'use-isnan': 2,
    'valid-jsdoc': [2, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: {returns: 'return'},
    }],
    'valid-typeof': 2,



    // Best Practices
    // http://eslint.org/docs/rules/#best-practices
    'complexity': [2, 20],
    'consistent-return': 2,
    'curly': [2, 'multi-line'],
    'default-case': 2,
    'dot-notation': 2,
    'eqeqeq': [2, 'allow-null'],
    // TODO 'guard-for-in': 2,
    'no-alert': 2,
    'no-eval': 2,
    'no-caller': 2,
    'no-else-return': 2,
    'no-empty-pattern': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-fallthrough': 2,
    // TODO 'no-invalid-this': 2,
    'no-loop-func': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-octal': 2,
    'no-redeclare': 2,
    'no-sequences': 2,
    'no-throw-literal': 2, // eslint:recommended
    'no-useless-concat': 2,
    'no-void': 2,
    'no-with': 2,
    'vars-on-top': 2,




    // Strict Mode
    // http://eslint.org/docs/rules/#strict-mode
    'no-unused-vars': [2, { 'args': 'none' }],




    // Stylistic Issues
    // http://eslint.org/docs/rules/#stylistic-issues
    'array-bracket-newline': 0, // eslint:recommended
    'array-bracket-spacing': [2, 'never'],
    'array-element-newline': 0, // eslint:recommended
    'block-spacing': [2, 'never'],
    'brace-style': 2,
    'camelcase': [2, {properties: 'never'}],
    'comma-dangle': [2, 'always-multiline'],
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'eol-last': 2,
    'func-call-spacing': 2,
    'indent': [2, 2],
    'key-spacing': 2,
    'keyword-spacing': 2,
    'linebreak-style': 2,
    'max-len': [2, {
      code: 180,
      tabWidth: 2,
      ignoreUrls: true,
      ignorePattern: '^goog\.(module|require)',
    }],
    'max-params': [2, 7],
    'max-statements': [2, 100],
    'new-cap': 2,
    'no-array-constructor': 2,
    'no-bitwise': 2,
    'no-continue': 2,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2, // eslint:recommended
    'no-multiple-empty-lines': [2, {max: 2}],
    'no-new-object': 2,
    'no-tabs': 2,
    'no-trailing-spaces': 2,
    'no-unneeded-ternary': 0,
    'object-curly-spacing': 2,
    'one-var': [2, {
      var: 'never',
      let: 'never',
      const: 'never',
    }],
    'padded-blocks': [2, 'never'],
    'quote-props': [2, 'consistent'],
    'quotes': [2, 'single'],
    /* TODO 'require-jsdoc': [2, {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
      },
    }],*/ 
    'semi': [2, 'always'],
    'semi-spacing': 2,
    'space-before-blocks': 2,
    'space-before-function-paren': [2, {
      asyncArrow: 'always',
      anonymous: 'never',
      named: 'never',
    }],
    'switch-colon-spacing': 2,




    // ECMAScript 6
    // http://eslint.org/docs/rules/#ecmascript-6

    'arrow-parens': [2, 'always'],
    'constructor-super': 2, // eslint:recommended
    'generator-star-spacing': [2, 'after'],
    'no-new-symbol': 2, // eslint:recommended
    'no-this-before-super': 2, // eslint:recommended
    'no-var': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'rest-spread-spacing': 2,
    'yield-star-spacing': [2, 'after'],





    // OTHER

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'arrow-spacing': [2, { 'before': false, 'after': true }],
    'vue/name-property-casing': ["error", "kebab-case"]

  }
};
