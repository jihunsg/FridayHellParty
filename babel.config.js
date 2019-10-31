module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          android: '4',
          edge: '12',
          firefox: '31',
          chrome: '30',
          safari: '10.1',
          ie: '9',
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    require.resolve('@babel/preset-react'),
  ];

  const plugins = [
    ['@babel/plugin-proposal-class-properties'],
    '@babel/plugin-transform-async-to-generator',
  ];

  const overrides = [
    {
      test: './node_modules',
      sourceType: 'unambiguous',
    },
  ];

  return {
    presets,
    plugins,
    overrides,
  };
};
