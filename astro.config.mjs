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
