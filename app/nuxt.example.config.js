export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'wlb-common-web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }],
    '@nuxtjs/moment',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', 'nuxt-basic-auth-module'],
  // , '@nuxtjs/proxy' // proxy removed

  basic: {
    name: process.env.BASIC_AUTH_USERNAME,
    pass: process.env.BASIC_AUTH_PSSWORD,
    enabled: process.env.BASIC_AUTH_ENABLE === 'true',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['lodash-es', 'chart.js', 'vue-chartjs/legacy'],
    loaders: {
      vue: {
        prettify: false,
      },
    },
  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
      regular: true,
    },
  },

  axios: {
    baseURL: 'https://api.welby-common-v2.cloco.tech',
    proxy: false,
  },
  // proxy: {
  //   '/v1': {
  //     target: 'https://api.welby-common-v2.cloco.tech',
  //     changeOrigin: true,
  //   },
  // },
}
