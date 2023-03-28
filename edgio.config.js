module.exports = {
  connector: '@edgio/next',
  routes: './edgio/routes.js',

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

  // backends: {
  //   // Define a domain or IP address to proxy as a backend
  //   // More on: https://docs.layer0.co/guides/layer0_config#backends
  //   api: {
  //     domainOrIp: 'api.tvmaze.com',
  //     hostHeader: 'api.tvmaze.com',
  //     // Disable backend SSL certificate security check, read more on:
  //     // https://docs.layer0.co/guides/layer0_config#:~:text=browser%20is%20used.-,disableCheckCert,-Boolean
  //     disableCheckCert: true,
  //   },
  //   // More on: https://docs.layer0.co/guides/image_optimization
  //   image: {
  //     domainOrIp: 'opt.moovweb.net',
  //     hostHeader: 'opt.moovweb.net',
  //     disableCheckCert: true,
  //   },
  // },
}
