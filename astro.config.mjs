import rehypeExternalLinks from 'rehype-external-links'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
    rehypePlugins: [rehypeExternalLinks],
    extendDefaultPlugins: true,
  },
})
