import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Determine if we're building for static GitHub Pages or server
const isStaticBuild = process.env.BUILD_MODE === 'static';

// https://astro.build/config
export default defineConfig({
  output: isStaticBuild ? 'static' : 'server',
  adapter: isStaticBuild
    ? undefined
    : node({
        mode: 'middleware',
      }),
  site: 'https://lukaszpiotrluczak.github.io',
  base: isStaticBuild ? '/devfest-lodz-2025/demo' : undefined,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  outDir: isStaticBuild ? '../../dist/demo' : '../../dist/astro',
  server: {
    port: 3001,
  },
  vite: {
    server: {
      fs: {
        // Allow serving files from the workspace root (for pnpm workspace dependencies)
        allow: ['../..'],
      },
    },
  },
});
