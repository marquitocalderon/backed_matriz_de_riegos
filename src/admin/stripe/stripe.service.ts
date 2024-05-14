// stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeDTO } from './dto/stripe.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly apiKey: string) {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2023-10-16', // Utiliza la versión más reciente de la API de Stripe
    });
  }

  async createCheckoutSession(products: StripeDTO): Promise<Stripe.Checkout.Session> {
    // Crea un arreglo de objetos line_items con información sobre los productos
    const lineItems = products.productos.map((product) => ({
      price_data: {
        currency: 'PEN', // Cambia a tu moneda preferida
        product_data: {
          name: product.nombre_producto,
        },
        unit_amount: product.precio * 100, // El precio en centavos
      },
      quantity: product.cantidad,
    }));

    // Crea la sesión de checkout con los line_items
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://ecommerce-cahuide-shop.vercel.app/',
      cancel_url: 'https://ecommerce-cahuide-shop.vercel.app/login',
    });

    return session;
  }
}
