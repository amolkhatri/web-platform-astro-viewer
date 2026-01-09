import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import { fileURLToPath } from 'url';
import path from 'path';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import vue from '@astrojs/vue';
import solidJs from '@astrojs/solid-js';
import qwikdev from '@qwikdev/astro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  build: {
   inlineStylesheets: 'always'
  },
  vite: {
      resolve: {
          alias: {
          }
      }
  },

  integrations: [
    react({
      include: ['**/components/react/**', '**/components/editor/**']
    }),
    vue(),
    solidJs({
      include: ['**/components/solid/**']
    }),
    qwikdev({
      include: ['**/components/qwik/**']
    }),
    partytown()
  ]
});
