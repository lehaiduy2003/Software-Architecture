import prisma from "../../prisma/database";
import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();
class OrderService {
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
      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
    }
  }

  // Send order details to Food Service via RabbitMQ
  async sendOrderToFoodService(orderData: any) {
    const orderMessage = JSON.stringify(orderData);
    this.channel.sendToQueue("order-food-queue", Buffer.from(orderMessage), { persistent: true });
    console.log("Order sent to Food Service");
  }

  // Create an order and send it to RabbitMQ
  async createOrder(data: any) {
    const order = await prisma.orders.create({
      data,
    });

    // Send the order to the Food Service
    await this.sendOrderToFoodService(order);
    return order;
  }

  // Fetch all orders
  async getAllOrders() {
    return await prisma.orders.findMany();
  }
}

export const orderService = new OrderService();
