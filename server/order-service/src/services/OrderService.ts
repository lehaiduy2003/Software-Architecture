import prisma from "../../prisma/database";
import amqp from "amqplib";
import dotenv from "dotenv";
import { Order } from "../libs/zod/types/Order";
import { OrderedFood } from "../libs/zod/types/OrderedFood";
import { Invoice, validateInvoice } from "../libs/zod/types/Invoice";
dotenv.config();
class OrderService {
  async getById(orderId: string) {
    return await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });
  }
  private channel!: amqp.Channel;

  constructor() {
    this.connectRabbitMQ();
  }

  // Connect to RabbitMQ
  private async connectRabbitMQ() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue("order-food-queue", { durable: true }); // Queue for orders
      await this.channel.assertQueue("order-invoice-queue", { durable: true });
      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
    }
  }

  // Send order details to Food Service via RabbitMQ
  async sendOrderToFoodService(orderData: any) {
    const orderMessage = JSON.stringify(orderData);
    this.channel.sendToQueue("food-queue", Buffer.from(orderMessage), { persistent: true });
    console.log("Order sent to Food Service");
  }

  // Create an order and send it to RabbitMQ
  async createOrder(data: Order, foods: OrderedFood[]) {
    const order = await prisma.orders.create({
      data,
    });

    let total = 0;
    
    const orderItems = foods.map((food) => {
      total += food.price * food.quantity;
      return {
        orderId: order.id,
        foodId: food.id,
        quantity: food.quantity,
      };
    });

    // Create order items
    await prisma.orderItems.createMany({
      data: orderItems,
    });

    const invoice = validateInvoice({ orderId: order.id, total });

    /// Send the invoice to the Invoice Consumer
    await this.sendInvoiceToConsumer(invoice);

    return order;
  }

  async sendInvoiceToConsumer(invoice: Invoice) {
    const invoiceMessage = JSON.stringify(invoice);
    this.channel.sendToQueue("invoice-queue", Buffer.from(invoiceMessage), {
      persistent: true,
    });
    console.log("Invoice sent to Invoice Service");
  }

  async sendToRestaurant(id: string, orderData: any) {
    const orderMessage = JSON.stringify(orderData);
    this.channel.sendToQueue("restaurant-queue", Buffer.from(orderMessage), { persistent: true });
    console.log("Order sent to Restaurant Service");
  }

  // Fetch all orders
  async getAllOrders() {
    return await prisma.orders.findMany();
  }
}

export const orderService = new OrderService();
