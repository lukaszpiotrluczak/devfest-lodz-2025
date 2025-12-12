import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ContactModule } from './contact/contact.module';
import { AstroModule } from './astro/astro.module';

@Module({
  imports: [
    // Global rate limiting: 100 requests per 15 minutes
    ThrottlerModule.forRoot([
      {
        ttl: 60000 * 15, // 15 minutes in milliseconds
        limit: 100,
      },
    ]),
    ContactModule,
    AstroModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
