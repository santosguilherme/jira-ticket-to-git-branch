const debug = process.env.NODE_ENV !== 'production';

const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/styles',
  '@mui/icons-material'
]);

module.exports = withTM({
  assetPrefix: !debug ? '/jira-ticket-to-git-branch/' : '',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  }
});
