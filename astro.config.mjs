import rehypeExternalLinks from 'rehype-external-links'
import { defineConfig } from 'astro/config'

import { zig } from './shiki/zig.js'
import { flix } from './shiki/flix.js'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs: [zig, flix],
    },
    rehypePlugins: [rehypeExternalLinks],
    extendDefaultPlugins: true,
  },
})
