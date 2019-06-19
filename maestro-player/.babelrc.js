
const { NODE_ENV = 'development' } = process.env;

const BABEL_PRESET_ENV_CONFIG = {
  modules: (process.env.NODE_ENV === 'test') ? 'commonjs' : false, // Jest + ES modules = no
  targets: {
    browsers: [
      'last 2 years',
      'ie 11',
    ],
  },
  useBuiltIns: 'entry',
};

const BABEL_PLUGINS = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-object-rest-spread',
  // Testing dynamic imports
  (NODE_ENV === 'test' && 'dynamic-import-node'),
  // Using "pretty" styled component names can make tests brittle, so we disable this feature in
  // test mode.
  (NODE_ENV !== 'test') && 'babel-plugin-styled-components',
  'babel-plugin-dev-expression',
  (NODE_ENV === 'production') && [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'remove',
      removeImport: false, // Dead code elim should pick these up
    },
  ],
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: false,
      helpers: true,
      regenerator: true,
      useESModules: process.env.NODE_ENV !== 'test', // Jest + ES modules = no
    },
  ],
  'react-hot-loader/babel',
].filter(plugin => plugin);

module.exports = {
  plugins: BABEL_PLUGINS,
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', BABEL_PRESET_ENV_CONFIG],
  ],
};
