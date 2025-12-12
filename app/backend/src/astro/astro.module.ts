import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AstroMiddleware } from './astro.middleware';

@Module({})
export class AstroModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply Astro middleware to all routes except /api/*
    consumer.apply(AstroMiddleware).exclude('api/(.*)').forRoutes('*');
  }
}
