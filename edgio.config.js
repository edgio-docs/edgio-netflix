module.exports = {
  connector: '@edgio/next',
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
