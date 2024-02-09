module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/screens',
          '@services': './src/services',
          '@styles': './src/styles',
          '@types': './src/types',
          '@config': './src/config',
          '@assets': './assets',
        },
      },
    ]
  ],
};
