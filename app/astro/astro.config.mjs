import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),
  site: 'https://lukaszpiotrluczak.me',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  outDir: '../../dist/astro',
  server: {
    port: 3001,
  },
});
