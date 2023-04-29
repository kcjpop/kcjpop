import rehypeExternalLinks from 'rehype-external-links'
import { defineConfig } from 'astro/config'

import { langs } from './shiki'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs,
    },
    rehypePlugins: [rehypeExternalLinks],
    extendDefaultPlugins: true,
  },
})
