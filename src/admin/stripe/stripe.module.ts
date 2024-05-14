// stripe.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [ConfigModule],
  controllers: [StripeController],
  providers: [
    {
      provide: StripeService,
      useFactory: (configService: ConfigService) =>
        new StripeService(configService.get<string>(process.env.STRIPE_API_KEY)),
      inject: [ConfigService],
    },
  ],
  exports: [StripeService],
})
export class StripeModule {}
