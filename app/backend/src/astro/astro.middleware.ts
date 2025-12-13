import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AstroMiddleware implements NestMiddleware {
  private astroHandler: any;

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
          })
          .catch((err) => {
            console.error('Failed to load Astro handler:', err);
          });
      } else {
        console.warn(
          `Astro entry not found at ${astroEntryPath}. Run 'pnpm run build' first.`
        );
      }
    }
  }

  async use(req: Request, res: Response, _next: NextFunction) {
    if (process.env.NODE_ENV === 'production' && this.astroHandler) {
      // Production: use Astro SSR handler
      await this.astroHandler(req, res);
    } else {
      // Development: return placeholder
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Development Mode</title>
          </head>
          <body>
            <h1>Development Mode</h1>
            <p>Astro dev server will be integrated here.</p>
            <p>Requested path: ${req.path}</p>
            <p><em>In production, run 'pnpm run build' first.</em></p>
          </body>
        </html>
      `);
    }
  }
}
