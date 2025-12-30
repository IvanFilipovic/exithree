// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  ssr: true,
  target: 'static',

  nitro: {
    preset: 'static',
    compressPublicAssets: true,
    prerender: { routes: ['/'] }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Exit Three • Automation & Web Solutions',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Automation and custom software that make your business faster, simpler, and smarter.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Exit Three' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@exitthree' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://www.google-analytics.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon_e3.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },


  // Vite / build
  vite: {
    build: { target: 'esnext' },
    cssTarget: 'chrome114',
    rollupOptions: {
      output: { manualChunks: (id) => id.includes('node_modules') && 'vendor' }
    },
    server: {
      watch: { usePolling: true, interval: 1000 }
    }
  },

  // Runtime config + env
  runtimeConfig: {
    public: {
      gtm_id: process.env.NUXT_PUBLIC_GTAG_ID,
      gtm_enabled: true,
      gtm_debug: process.env.NODE_ENV === 'development' ? true : false,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || '',
      basicApiKey: process.env.NUXT_PUBLIC_BASIC_API_KEY || '',
      motion: {
        directives: {
          'faq-pop': {
            initial: { opacity: 0, scale: 0.95, y: -100 },
            enter: {
              opacity: 1, scale: 1, y: 0,
              transition: { duration: 1.2, easing: 'easeOutCubic' }
            },
            leave: {
              opacity: 0, scale: 0.95, y: -100,
              transition: { duration: 0.8, easing: 'easeInCubic' }
            }
          }
        }
      }
    }
  },

  devtools: { enabled: true },

  vitalizer: {
    disableStylesheets: 'entry',
    disablePrefetchLinks: true,
    delayHydration: {
      hydrateOnEvents: ['mousemove', 'scroll', 'keydown', 'click', 'touchstart', 'wheel'],
      idleCallbackTimeout: 8000,
      postIdleTimeout: 4000
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-anchorscroll',
    'nuxt-particles',
    'nuxt-aos',
    'nuxt-mdi',
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    'nuxt-lazy-hydrate',
    'nuxt-vitalizer',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],
  i18n: {
    bundle: { optimizeTranslationDirective: false },
    locales: [
      { code: 'en', name: 'EN', file: 'en.json', icon: 'circle-flags:lang-en-us' },
      { code: 'hr', name: 'HR', file: 'hr.json', icon: 'circle-flags:lang-hr' }
    ],
    lazy: false,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    seo: true
  },

  cookieControl: {
    locales: ['en', 'hr'],
    cookies: {
      necessary: [
        {
          id: 'mandatory',
          name: {
            en: 'Mandatory cookies',
            hr: 'Obavezni kolačići'
          },
          description: {
            en: 'These cookies are required for the website to work',
            hr: 'Ovi kolačići su nužni za rad stranice'
          },
          targetCookieIds: []
        }
      ],
      optional: [
        {
          id: 'analytics',
          name: {
            en: 'Marketing cookies',
            hr: 'Marketinški kolačići'
          },
          isPreselected: false,
          description: {
            en: 'Helps us understand how visitors use the site.',
            hr: 'Pomaže nam razumjeti kako posjetitelji koriste stranicu.'
          },
          targetCookieIds: ['_ga', '_ga_', '_gcl_au']
        }
      ]
    },
    barPosition: 'bottom-right',
    closeModalOnClickOutside: true,
    colors: {
      barBackground: '#f4f5f8',
      barButtonBackground: '#141619',
      barButtonColor: '#f4f5f8',
      barButtonHoverBackground: '#0A21C0',
      barButtonHoverColor: '#f4f5f8',
      barTextColor: '#141619',
      checkboxActiveBackground: '#0A21C0',
      checkboxActiveCircleBackground: '#e4e6ef',
      checkboxDisabledBackground: '#0A21C0',
      checkboxDisabledCircleBackground: '#e4e6ef',
      checkboxInactiveBackground: '#B3B4BD',
      checkboxInactiveCircleBackground: '#f4f5f8',
      controlButtonBackground: '#0A21C0',
      controlButtonHoverBackground: '#f4f5f8',
      controlButtonIconColor: '#f4f5f8',
      controlButtonIconHoverColor: '#0A21C0',
      focusRingColor: '#f4f5f8',
      modalBackground: '#f4f5f8',
      modalButtonBackground: '#141619',
      modalButtonColor: '#f4f5f8',
      modalButtonHoverBackground: '#0A21C0',
      modalButtonHoverColor: '#f4f5f8',
      modalOverlay: '#141619',
      modalOverlayOpacity: 0.8,
      modalTextColor: '#141619',
      modalUnsavedColor: '#0A21C0'
    }
  },
  site: {  url: 'https://www.exit3.online',  name: 'Exit Three'  },

  // Nuxt Image (globalna optimizacija)
  image: {
    format: ['webp', 'avif'],
    // Ako koristiš eksterni CDN, postavi domains: ['res.cloudinary.com', ...]
    // providerOptions: { ipx: { modifiers: { quality: 80 } } }
  },

  anchorscroll: { hooks: ['page:transition:finish'] }
})
