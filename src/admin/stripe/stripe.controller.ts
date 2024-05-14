import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeDTO } from './dto/stripe.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('pago')
  async createCheckoutSession(@Body() products: StripeDTO): Promise<any> {
    try {
      const session = await this.stripeService.createCheckoutSession(products);
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
