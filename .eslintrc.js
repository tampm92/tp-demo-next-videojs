module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': 0,
    semi: 1,
    'no-unused-vars': 1,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'max-len': 0,
    'no-floating-decimal': 0,
    'keyword-spacing': 0,
    'no-lonely-if': 0,
    'import/no-cycle': 2,
    'import/prefer-default-export': 0,
    'linebreak-style': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: [
          'webpack.*.js',
        ],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['CustomInputLabel'],
      labelAttributes: ['label'],
      controlComponents: ['CustomInput'],
      depth: 3,
    }],
    'react/forbid-prop-types': [0, { forbid: ['array', 'object'], checkContextTypes: true, checkChildContextTypes: false }],
  },
};
