import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import { bundledLanguages } from "./node_modules/shiki";

import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://expressjs-astro.vercel.app/",
  output: "hybrid",
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  redirects: {
    "/en/[...slug]": "/[...slug]",
  },
  integrations: [
    starlight({
      title: "Express",
      sidebar: [
        {
          label: "Getting Started",
          items: [
            {
              label: "Installing",
              link: "/starter/installing",
            },
            {
              label: "Hello world",
              link: "/starter/hello-world",
            },
            {
              label: "Express generator",
              link: "/starter/generator",
            },
            {
              label: "Basic routing",
              link: "/starter/basic-routing",
            },
            {
              label: "Static files",
              link: "/starter/static-files",
            },
            {
              label: "FAQ",
              link: "starter/faq",
            },
          ],
        },
        {
          label: "Guide",
          items: [
            {
              label: "Routing",
              link: "/guide/routing",
            },
            {
              label: "Writing middleware",
              link: "/guide/writing-middleware",
            },
            {
              label: "Using middleware",
              link: "/guide/using-middleware",
            },
            {
              label: "Overriding the Express API",
              link: "/guide/overriding-express-api",
            },
            {
              label: "Using template engines",
              link: "guide/using-template-engines",
            },
            {
              label: "Error Handling",
              link: "guide/error-handling",
            },
            {
              label: "Debugging",
              link: "guide/debugging",
            },
            {
              label: "Express behind proxies",
              link: "guide/behind-proxies",
            },
            {
              label: "Moving to Express 4",
              link: "guide/migrating-4",
            },
            {
              label: "Moving to Express 5",
              link: "guide/migrating-5",
            },
            {
              label: "Database integration",
              link: "guide/database-integration",
            },
          ],
        },
        {
          label: "API reference",
          items: [
            {
              label: "5.x",
              link: "5x/api",
              badge: {
                text: "beta",
                variant: "caution",
              },
            },
            {
              label: "4.x",
              link: "4x/api",
            },
          ],
        },
        {
          label: "Advanced topics",
          items: [
            {
              label: "Building template engines",
              link: "advanced/developing-template-engines",
            },
            {
              label: "Security updates",
              link: "advanced/security-updates",
            },
            {
              label: "Security best practices",
              link: "advanced/best-practice-security",
            },
            {
              label: "Performance best practices",
              link: "advanced/best-practice-performance",
            },
            {
              label: "Health checks & shutdown",
              link: "advanced/healthcheck-graceful-shutdown",
            },
          ],
        },
        {
          label: "Resources",
          items: [
            {
              label: "Community",
              link: "resources/community",
            },
            {
              label: "Glossary",
              link: "resources/glossary",
            },
            {
              label: "Middleware",
              link: "resources/middleware",
            },
            {
              label: "Utility modules",
              link: "resources/utils",
            },
            {
              label: "Contributing to Express",
              link: "resources/contributing",
            },
            {
              label: "Release Change Log",
              link: "changelog/4x",
            },
          ],
        },
      ],
      social: {
        github: "https://github.com/expressjs/express",
      },
      components: {
        Hero: "./src/components/starlight/Hero.astro",
        Head: "./src/components/starlight/Head.astro",
        SiteTitle: "./src/components/starlight/SiteTitle.astro",
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      favicon: "/favicon.ico",
      logo: {
        light: "./public/logotype/logotype-light.svg",
        dark: "./public/logotype/logotype-dark.svg",
        replacesTitle: true,
      },
      editLink: {
        baseUrl: "https://github.com/bjohansebas/expressjs.com/edit/astro/",
      },
      customCss: ["./src/styles/theme.css", "./src/styles/heading.css"],
      plugins: process.env.CHECK_LINKS
        ? [
            starlightLinksValidator({
              errorOnFallbackPages: false,
              errorOnInconsistentLocale: true,
            }),
          ]
        : [],
    }),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    rehypePlugins: [
      rehypeSlug,
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
    shikiConfig: {
      langs: [
        {
          ...(await bundledLanguages.javascript()).default[0],
          scopeName: "source.cjs",
          aliases: ["cjs"],
        },
      ],
    },
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
