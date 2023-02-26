import rehypeExternalLinks from 'rehype-external-links'
import { defineConfig } from 'astro/config'

import { zig, flix, gleam } from './shiki'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs: [zig, flix, gleam],
    },
    rehypePlugins: [rehypeExternalLinks],
    extendDefaultPlugins: true,
  },
})
