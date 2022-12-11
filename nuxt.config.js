import { defineNuxtConfig } from '@nuxt/bridge'
export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Подполье - Одесса",
    htmlAttrs: {
      lang: "ru"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Некоммерческий, аполитичный, нерелигиозный проект. Сейчас антикафе Подполье создается исключительно силами инициативной группы единомышленников, волонтеров и меценатов. Мы всегда рады помощи и открыты для общения и сотрудничества."
      },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: {
    color: "#400D09",
    height: "5px"
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/styles/globals.css", "~/assets/styles/hamburgers.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/VueAwesomeSwiper.js" }, { src: "~/plugins/vue-modal.js" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/pwa", "nuxt-gsap-module", "@nuxtjs/svg"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],
  gsap: {
    extraPlugins: {
      scrollTrigger: true
    }
  },
  robots: {
    Sitemap: "https://podpolye.org/sitemap.xml"
  },
  sitemap: {
    hostname: "https://podpolye.org"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build

  pwa: {
    meta: {
      title: "Подполье",
      mobileAppIOS: true,
      appleStatusBarStyle: "black",
      theme_color: "#0d0d0d",
      nativeUI: true
    },
    manifest: {
      name: "Подполье - Одесса",
      short_name: "Подполье",
      description:
        "Некоммерческий, аполитичный, нерелигиозный проект. Сейчас пространство Подполье создается исключительно силами инициативной группы единомышленников, волонтеров и меценатов. Мы всегда рады помощи и открыты для общения и сотрудничества.",
      lang: "ru"
    }
  },
  target: "static"
})
