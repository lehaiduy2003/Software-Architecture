import Stripe from "stripe";
import { OrderedFood } from "../libs/zod/types/OrderedFood";
import calculateTotalPrice from "../utils/calculatePrice";
import dotenv from "dotenv";
dotenv.config();

export default class StripeService {
  private readonly stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }
  public checkout = async (foods: OrderedFood[]) => {
    const totalPrice = calculateTotalPrice(foods);
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(totalPrice * 100),
        currency: "usd",
      });
      return paymentIntent.client_secret;
    } catch (error) {
      throw error;
    }
  };
}
