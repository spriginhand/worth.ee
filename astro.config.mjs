import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://worth.ee',
  integrations: [sitemap()],
  build: {
    // One stylesheet, inlined and minified into every page. A separate CSS
    // request would be render-blocking; inlining removes it from the critical
    // path entirely, and Astro's minifier cuts the payload from 9KB to ~6KB.
    inlineStylesheets: 'always',
  },
});
