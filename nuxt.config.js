export default {
  head: {
    title: 'notion-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        link: [
          { rel: 'apple-touch-startup-image', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)', href: '/static/splash/iphone5_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)', href: '/static/splash/iphone6_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)', href: '/static/splash/iphoneplus_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)', href: '/static/splash/iphonex_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)', href: '/static/splash/iphonexr_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)', href: '/static/splash/iphonexsmax_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)', href: '/static/splash/ipad_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)', href: '/static/splash/ipadpro1_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)', href: '/static/splash/ipadpro3_splash.png' },
          { rel: 'apple-touch-startup-image', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)', href: '/static/splash/ipadpro2_splash.png' }
        ]
      },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'APP_TITLE' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/css/bootstrap.min.css',
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    '@nuxtjs/pwa',
  ],
  pwa: {
    icon: {
      source: `/icon_pwa.png`,
      fileName: '/icon_pwa.png'
    },
    manifest: {
      lang: 'ja',
      name: 'Bookshelf on Notion',
      short_name: 'BoN',
      description: 'This app is a bookshelf application using Notion',
      display: 'standalone',
      theme_color: '#000',
      background_color: '#fff',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: `/icon_pwa.png`,
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '^https://polyfill.io/.*',
          handler: 'cacheFirst'
        },
        {
          urlPattern: `${process.env.BASE_URL}.*`,
          handler: 'staleWhileRevalidate',
          strategyOptions: {
            cacheName: 'site-cache',
          },
          strategyPlugins: [
            {
              use: 'Expiration',
              config: {
                maxAgeSeconds: 24 * 60 * 60 * 30
              }
            }
          ]
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: '/',
  },
  build: {
  },
  env: {
    baseUrl: process.env.BASE_URL
  },
  serverMiddleware: ['~/api']
}
