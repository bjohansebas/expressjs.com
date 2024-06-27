import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

import rehypeSlug from 'rehype-slug'
import { bundledLanguages } from './node_modules/shiki'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  compressHTML: true,
  integrations: [starlight({
    title: 'Express',
    defaultLocale: 'root',
    locales: {
      root: {
        label: 'English',
        lang: 'en'
      }
    },
    sidebar: [{
      label: 'Getting Started',
      items: [{
        label: 'Installing',
        link: '/starter/installing'
      }, {
        label: 'Hello world',
        link: '/starter/hello-world'
      }, {
        label: 'Express generator',
        link: '/starter/generator'
      },
      {
        label: 'Basic routing',
        link: '/starter/basic-routing'
      },
      {
        label: 'Static files',
        link: '/starter/static-files'
      }, {
        label: 'FAQ',
        link: 'starter/faq'
      }
      ]
    }, {
      label: 'Guide',
      items: [{
        label: 'Routing',
        link: '/guide/routing'
      }, {
        label: 'Writing middleware',
        link: '/guide/writing-middleware'
      }, {
        label: 'Using middleware',
        link: '/guide/using-middleware'
      },
      {
        label: 'Overriding the Express API',
        link: '/guide/overriding-express-api'
      }, {
        label: 'Using template engines',
        link: 'guide/using-template-engines'
      }, {
        label: 'Error Handling',
        link: 'guide/error-handling'
      }, {
        label: 'Debugging',
        link: 'guide/debugging'
      }, {
        label: 'Express behind proxies',
        link: 'guide/behind-proxies'
      }, {
        label: 'Moving to Express 4',
        link: 'guide/migrating-4'
      }, {
        label: 'Moving to Express 5',
        link: 'guide/migrating-5'
      }, {
        label: 'Database integration',
        link: 'guide/database-integration'
      }
      ]
    }, {
      label: 'API reference',
      items: [{
        label: '4.x',
        link: '/4x/api'
      }]
    }],
    social: {
      github: 'https://github.com/expressjs/express'
    },
    components: {
      Hero: './src/components/starlight/Hero.astro'
    }
  })],
  markdown: {
    syntaxHighlight: 'prism',
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      langs: [
        {
          ...(await bundledLanguages.javascript()).default[0],
          scopeName: 'source.cjs',
          aliases: ['cjs']
        }
      ]
    }
  }
})
