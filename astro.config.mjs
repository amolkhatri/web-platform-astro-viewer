import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import { fileURLToPath } from 'url';
import path from 'path';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),

  vite: {
      resolve: {
          alias: {
          }
      }
  },

  integrations: [
    react(),
    partytown()
  ]
});