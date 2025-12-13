import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AstroMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AstroMiddleware.name);
  private astroHandler: any;
  private readonly astroDevPort = 4321; // Astro's default dev port

  constructor() {
    // Initialize Astro app in production mode
    if (process.env.NODE_ENV === 'production') {
      // Load Astro's built SSR handler from dist/astro/server/entry.mjs
      // Use __dirname to find the correct path relative to the compiled backend
      const repoRoot = path.resolve(__dirname, '..', '..', '..');
      const astroEntryPath = path.join(
        repoRoot,
        'dist',
        'astro',
        'server',
        'entry.mjs'
      );

      if (fs.existsSync(astroEntryPath)) {
        // Dynamic import of Astro entry (ESM)
        import(astroEntryPath)
          .then((module) => {
            this.astroHandler = module.handler;
            this.logger.log('Astro SSR handler loaded successfully');
          })
          .catch((err) => {
            this.logger.error('Failed to load Astro handler:', err);
          });
      } else {
        this.logger.warn(
          `Astro entry not found at ${astroEntryPath}. Run 'pnpm run build' first.`
        );
      }
    } else {
      this.logger.log(
        `Development mode: Proxy to Astro dev server on port ${this.astroDevPort}`
      );
    }
  }

  async use(req: Request, res: Response, _next: NextFunction) {
    if (process.env.NODE_ENV === 'production' && this.astroHandler) {
      // Production: use Astro SSR handler
      await this.astroHandler(req, res);
    } else {
      // Development: proxy to Astro dev server
      try {
        const fetch = (await import('node-fetch')).default;
        const astroUrl = `http://localhost:${this.astroDevPort}${req.url}`;

        const astroResponse = await fetch(astroUrl, {
          method: req.method,
          headers: req.headers as any,
        });

        // Copy status and headers
        res.status(astroResponse.status);
        astroResponse.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });

        // Stream response body
        const body = await astroResponse.text();
        res.send(body);
      } catch (error) {
        this.logger.error('Failed to proxy to Astro dev server:', error);
        res.status(503).send(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Astro Dev Server Unavailable</title>
            </head>
            <body>
              <h1>Astro Dev Server Unavailable</h1>
              <p>Could not connect to Astro dev server at http://localhost:${this.astroDevPort}</p>
              <p>Make sure Astro dev server is running:</p>
              <pre>cd app/astro && pnpm run dev</pre>
              <p>Error: ${error.message}</p>
            </body>
          </html>
        `);
      }
    }
  }
}
