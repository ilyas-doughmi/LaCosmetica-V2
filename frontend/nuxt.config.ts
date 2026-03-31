// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public:{
      apiBase: 'http://127.0.0.1:8000/api'
    }
  },

  vite: {
    server: {
      middlewareMode: false
    }
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  }
})
