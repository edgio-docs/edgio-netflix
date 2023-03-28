// This file was automatically added by layer0 init.
// You should commit this file to source control.
const { withEdgio } = require('@edgio/next/config')

module.exports = (phase, config) =>
  withEdgio({
    images: {
      domains: ['static.tvmaze.com'],
    },
  })
