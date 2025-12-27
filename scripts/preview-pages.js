#!/usr/bin/env node

/**
 * Preview GitHub Pages build locally
 *
 * Usage:
 *   pnpm run pages:preview
 *   PORT=8080 pnpm run pages:preview
 */

import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PAGES_DIR = join(__dirname, '..', 'dist', 'pages');
const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  // cspell:ignore fontobject
  '.eot': 'application/vnd.ms-fontobject',
};

const server = createServer((req, res) => {
  let filePath = join(PAGES_DIR, req.url === '/' ? 'index.html' : req.url);

  // Remove query string
  const queryIndex = filePath.indexOf('?');
  if (queryIndex !== -1) {
    filePath = filePath.substring(0, queryIndex);
  }

  // Try to serve the file
  try {
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      filePath = join(filePath, 'index.html');
    }

    const ext = extname(filePath);
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mimeType });
    createReadStream(filePath).pipe(res);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 GitHub Pages preview server running at:\n`);
  console.log(`   Local:   http://localhost:${PORT}/`);
  console.log(`\n📊 Preview:\n`);
  console.log(`   Dashboard:     http://localhost:${PORT}/`);
  console.log(`   Slides:        http://localhost:${PORT}/slides/`);
  console.log(`   Demo App:      http://localhost:${PORT}/demo/`);
  console.log(`\n💡 Tip: Use PORT environment variable to change the port`);
  console.log(`   Example: PORT=3000 pnpm run pages:preview\n`);
  console.log(`Press Ctrl+C to stop the server\n`);
});
