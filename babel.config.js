module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  env: {
    production: {
      ignore: ['**/*.test.js'],
    },
    development: {
      ignore: ['**/*.test.js'],
    },
  },
};
