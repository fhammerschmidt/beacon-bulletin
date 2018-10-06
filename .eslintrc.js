module.exports = {
  ecmaFeatures: {
    jsx: true,
    modules: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  extends: ['plugin:import/errors'],
  plugins: ['babel', 'flowtype', 'jest', 'react', 'react-native'],
  rules: {
    // Possible Errors
    'no-await-in-loop': 2,
    'no-compare-neg-zero': 2,
    'no-cond-assign': 2,
    'no-console': 1,
    // "no-constant-condition": 2, -> required for sagas...
    'no-control-regex': 2,
    'no-debugger': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty': 2,
    'no-ex-assign': 2,
    'no-extra-boolean-cast': 2,
    // "no-extra-parens": [2, "all", { "nestedBinaryExpressions": false }],
    'no-extra-semi': 2,
    'no-func-assign': 2,
    'no-inner-declarations': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-obj-calls': 2,
    'no-prototype-builtins': 2,
    'no-regex-spaces': 2,
    'no-sparse-arrays': 2,
    'no-template-curly-in-string': 2,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unsafe-negation': 2,
    'use-isnan': 2,
    'valid-jsdoc': 2,
    'valid-typeof': 2,

    // Best Practices
    'accessor-pairs': 2,
    'array-callback-return': 2,
    // "block-scoped-var": 2, -> we have no-var anyway
    // "class-methods-use-this": 1,
    complexity: 2,
    'consistent-return': 2,
    curly: 2,
    'default-case': 2,
    'dot-location': [2, 'property'],
    'dot-notation': 2,
    eqeqeq: [2, 'smart'],
    'guard-for-in': 2,
    'no-alert': 2,
    'no-caller': 2,
    'no-case-declarations': 2,
    'no-div-regex': 2,
    // "no-else-return": 2,
    'no-empty-function': 2,
    'no-empty-pattern': 2,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-label': 2,
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-global-assign': 2,
    'no-implicit-coercion': 2,
    'no-implicit-globals': 2,
    'no-implied-eval': 2,
    // "no-invalid-this": 2, -> conflicts with use in JSX
    'no-iterator': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-loop-func': 2,
    // "no-magic-numbers": 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-octal-escape': 2,
    'no-octal': 2,
    'no-param-reassign': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    // "no-restricted-properties": [ 2, {} ],
    'no-return-assign': 2,
    'no-return-await': 2,
    'no-script-url': 2,
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-throw-literal': 2,
    'no-unmodified-loop-condition': 2,
    'no-unused-expressions': 2,
    'no-unused-labels': 2,
    'no-useless-call': 2,
    'no-useless-concat': 2,
    'no-useless-escape': 2,
    'no-void': 2,
    'no-warning-comments': 1,
    'no-with': 2,
    'prefer-promise-reject-errors': 2,
    radix: 2,
    'require-await': 2,
    // "vars-on-top": 2,
    'wrap-iife': 2,
    yoda: 2,

    // Strict Mode
    strict: 2,

    // Variables
    'init-declarations': 2,
    'no-catch-shadow': 2,
    'no-delete-var': 2,
    'no-label-var': 2,
    // "no-restricted-globals": 2,
    'no-shadow-restricted-names': 2,
    'no-shadow': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-undefined': 2,
    'no-unused-vars': [
      2,
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    // "no-use-before-define": 2,

    // Node.js and CommonJS
    'callback-return': 2,
    'global-require': 2,
    'handle-callback-err': 2,
    'no-mixed-requires': 2,
    'no-new-require': 2,
    'no-path-concat': 2,
    'no-process-env': 0,
    'no-process-exit': 2,
    'no-restricted-modules': 2,
    'no-sync': 2,

    // Stylistic Issues
    // "array-bracket-spacing": [2, "never"],
    // "block-spacing": 2,
    // "brace-style": [2, "1tbs"],
    // "camelcase": 2,
    // "capitalized-comments": 2,
    // "comma-dangle": [ 2, "always-multiline" ],
    // "comma-spacing": 2,
    // "comma-style": 2,
    // "computed-property-spacing": 2,
    'consistent-this': 2,
    // "eol-last": 2,
    // "func-call-spacing": 2,
    'func-name-matching': 2,
    // "func-names": 2,
    // "func-style": 2,
    // "id-blacklist": [2, "data", "err", "e", "cb", "callback"],
    // "id-length": 2,
    // "id-match": 2,
    // "indent": [2, 2, {"SwitchCase": 1}],
    // "jsx-quotes": 2,
    // "key-spacing": 2,
    // "keyword-spacing": 2,
    // "line-comment-position": 2,
    // "linebreak-style": 2,
    // "lines-around-comment": 2,
    // "lines-around-directive": 2,
    'max-depth': 2,
    'max-len': [2, 120, 2, { ignorePattern: '.*import.*from.*' }],
    'max-lines': 2,
    'max-nested-callbacks': 2,
    'max-params': 2,
    'max-statements': [2, 20],
    'max-statements-per-line': 2,
    // "multiline-ternary": 2,
    // "new-cap": 2,
    'new-parens': 2,
    // "newline-after-var": 2,
    // "newline-before-return": 2,
    // "newline-per-chained-call": 2,
    'no-array-constructor': 2,
    'no-bitwise': 2,
    'no-continue': 2,
    // "no-inline-comments": 2,
    'no-lonely-if': 2,
    // "no-mixed-operators": 2,
    // "no-mixed-spaces-and-tabs": 2,
    // "no-multiple-empty-lines": 2,
    'no-negated-condition': 2,
    'no-nested-ternary': 2,
    'no-new-object': 2,
    // "no-plusplus": 2,
    'no-restricted-syntax': 2,
    // "no-tabs": 2,
    // "no-ternary": 2,
    // "no-trailing-spaces": [2, { "skipBlankLines": true }],
    'no-underscore-dangle': 2,
    'no-unneeded-ternary': 2,
    // "no-whitespace-before-property": 2,
    // "object-curly-newline": 2,
    // "object-curly-spacing": 2, -> babel/object-curly-spacing
    // "object-property-newline": [2, { "allowMultiplePropertiesPerLine": true }],
    // "one-var": [2, "never"],
    // "one-var-declaration-per-line": 2,
    'operator-assignment': 2,
    'operator-linebreak': 2,
    // "padded-blocks": 2,
    // "quote-props": [2, "as-needed"],
    // "quotes": [2, "single"],
    // "require-jsdoc": 2,
    // "semi": 2, -> babel/semi
    // "semi-spacing": 2,
    // "sort-keys": 2,
    // "sort-vars": 2,
    // "space-before-blocks": 2,
    // "space-before-function-paren": [2, "never"],
    // "space-in-parens": 2,
    // "space-infix-ops": 2,
    // "space-unary-ops": 2,
    // "spaced-comment": 2,
    // "template-tag-spacing": 2,
    'unicode-bom': 2,
    // "wrap-regex": 2,

    // ES6
    // "arrow-body-style": 2,
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': 2,
    'constructor-super': 2,
    'generator-star-spacing': [2, 'after'],
    'no-class-assign': 2,
    // "no-confusing-arrow": 2,
    'no-const-assign': 2,
    'no-dupe-class-members': 2,
    // "no-duplicate-imports": 2, -> import/no-duplicates
    'no-new-symbol': 2,
    'no-restricted-imports': [2, 'underscore'], // we use lodash
    'no-this-before-super': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-rename': 2,
    'no-var': 2,
    'object-shorthand': [2, 'methods'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    // "prefer-destructuring": 2,
    'prefer-numeric-literals': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'prefer-template': 2,
    'require-yield': 2,
    'rest-spread-spacing': 2,
    // "sort-imports": 2,
    'symbol-description': 2,
    'template-curly-spacing': 2,
    'yield-star-spacing': 2,

    // Babel
    'babel/new-cap': [2, { capIsNewExceptions: ['Immutable'] }],
    'babel/object-curly-spacing': [2, 'always'],
    'babel/no-invalid-this': 2,
    'babel/semi': 2,

    // Flow
    'flowtype/boolean-style': 2,
    'flowtype/define-flow-type': 2,
    'flowtype/delimiter-dangle': [2, 'always-multiline'],
    'flowtype/generic-spacing': 2,
    'flowtype/no-dupe-keys': 2,
    // "flowtype/no-primitive-constructor-types": 2,
    // "flowtype/no-weak-types": 2,
    'flowtype/object-type-delimiter': [2, 'comma'],
    // "flowtype/require-parameter-type": 2,
    // "flowtype/require-return-type": 2,
    'flowtype/require-valid-file-annotation': [2, 'always'],
    // "flowtype/require-variable-type": 2,
    'flowtype/semi': 2,
    // "flowtype/sort-keys": 2,
    'flowtype/space-after-type-colon': 2,
    'flowtype/space-before-generic-bracket': 2,
    'flowtype/space-before-type-colon': 2,
    // "flowtype/type-id-match": 2,
    'flowtype/union-intersection-spacing': 2,
    'flowtype/use-flow-type': 2,
    'flowtype/valid-syntax': 2,

    // Jest
    'jest/no-disabled-tests': 1,
    'jest/no-focused-tests': 2,
    'jest/no-identical-title': 2,
    // "jest/valid-expect": 2,

    // React
    // "react/display-name": 2,
    // "react/forbid-component-props": 2,
    // "react/forbid-elements": 2,
    // "react/forbid-prop-types": 2,
    // "react/forbid-foreign-prop-types": 2,
    'react/no-danger': 2,
    // "react/no-danger-with-children": 2,
    'react/no-deprecated': 2,
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    // "react/no-multi-comp": 2,
    'react/no-render-return-value': 2,
    // "react/no-set-state": 2,
    'react/no-string-refs': 2,
    'react/no-unescaped-entities': 2,
    'react/no-unknown-property': 2,
    'react/no-unused-prop-types': 2,
    'react/prefer-es6-class': 2,
    // "react/prefer-stateless-function": 1,
    // "react/prop-types": 2,
    'react/react-in-jsx-scope': 2,
    // "react/require-default-props": 2,
    // "react/require-optimization": 2,
    'react/require-render-return': 2,
    'react/self-closing-comp': 2,
    // "react/sort-comp": 2,
    // "react/sort-prop-types": 2,
    'react/style-prop-object': 2,
    // "react/void-dom-elements-no-children": 2,

    // React - JSX
    'react/jsx-boolean-value': [2, 'always'],
    // "react/jsx-closing-bracket-location": 2,
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-equals-spacing': 2,
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }],
    // "react/jsx-first-prop-new-line": 2,
    'react/jsx-handler-names': 2,
    // "react/jsx-indent": [2, 2],
    // "react/jsx-indent-props": [2, 2],
    'react/jsx-key': 2,
    // "react/jsx-max-props-per-line": 2,
    'react/jsx-no-bind': 2,
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-no-duplicate-props': 2,
    // "react/jsx-no-literals": 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-pascal-case': 2,
    // "react/jsx-sort-props": 2,
    'react/jsx-space-before-closing': 2,
    'react/jsx-tag-spacing': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-wrap-multilines': [2, { declaration: false }],

    // React Native
    // "react-native/no-color-literals": 2,
    // "react-native/no-inline-styles": 2,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 1,

    // Import - Static analysis
    'import/no-unresolved': 2,
    'import/named': 2,
    'import/default': 2,
    'import/namespace': 2,
    // "import/no-restricted-paths": 2,
    'import/no-absolute-path': 2,
    'import/no-dynamic-require': 2,
    // "import/no-internal-modules": 2,
    'import/no-webpack-loader-syntax': 2,

    // Import - Helpful warnings
    'import/export': 2,
    'import/no-named-as-default': 2,
    'import/no-named-as-default-member': 2,
    'import/no-deprecated': 2,
    'import/no-extraneous-dependencies': 2,
    'import/no-mutable-exports': 2,

    // Import - Module systems
    'import/no-commonjs': [2, { allowRequire: true }],
    'import/no-amd': 2,
    'import/no-nodejs-modules': 0,
    'import/unambiguous': 2,

    // Import - Style guide
    'import/first': 2,
    'import/no-duplicates': 2,
    // 'import/no-namespace': 2,
    'import/extensions': 2,
    'import/order': 2,
    'import/newline-after-import': 2,
    // "import/prefer-default-export": 1,
    'import/max-dependencies': ['error', { max: 20 }],
    // "import/no-unassigned-import": 2,
    // "import/no-named-default": 2
  },
};
