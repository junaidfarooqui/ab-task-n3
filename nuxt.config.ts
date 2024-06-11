import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
      contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      isDev: process.env.NODE_ENV === 'development'
    },
  },
  plugins: [
      '~/plugins/contentful.js'
  ],
  devtools: { enabled: true }
})
