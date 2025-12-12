import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NodeApp } from 'astro/app/node';
import { manifest } from './astro-manifest';

@Injectable()
export class AstroMiddleware implements NestMiddleware {
  private astroApp: NodeApp;

  constructor() {
    // Initialize Astro app in production mode
    // In development, this will be replaced by Astro dev server integration
    if (process.env.NODE_ENV === 'production') {
      this.astroApp = new NodeApp(manifest);
    }
  }

  async use(req: Request, res: Response, _next: NextFunction) {
    if (process.env.NODE_ENV === 'production') {
      // Production: use Astro SSR handler
      await this.astroApp.render(req, res);
    } else {
      // Development: delegate to Astro dev server (handled separately)
      // For now, return a placeholder response
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
          </body>
        </html>
      `);
    }
  }
}
