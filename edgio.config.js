module.exports = {
  connector: '@edgio/next',

  environments: {
    production: {
      // Add the hostnames for your production environment here
      hostnames: [],
    },
  },

  origins: [
    {
      name: 'api',
      override_host_header: 'api.tvmaze.com',
      hosts: [
        {
          scheme: 'match',
          location: [
            {
              hostname: 'api.tvmaze.com',
            },
          ],
        },
      ],
    },
  ],
}
