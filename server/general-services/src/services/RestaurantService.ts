import prisma from "../../prisma/database";
import amqp from "amqplib";
import dotenv from "dotenv";
import { Food } from "../libs/zod/types/FoodValidation";

dotenv.config();

export default class RestaurantService {
  private channel!: amqp.Channel;

  constructor() {
    this.connectRabbitMQ();
  }

  // Connect to RabbitMQ and start listening to the queue
  private async connectRabbitMQ() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue("restaurant-queue", { durable: true });
      this.consumeMessages();
      this.channel;
      console.log("restaurant Service is listening to the queue");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
    }
  }

  public getTop10Restaurants = async () => {
    return await prisma.restaurants.findMany({
      take: 10,
      orderBy: {
        totalOrder: "desc",
      },
    });
  };

  consumeMessages() {
    this.channel.consume("restaurant-queue", async (msg: any) => {
      if (msg !== null) {
        const restaurantData = JSON.parse(msg.content.toString());
        console.log("Received restaurantData:", restaurantData);

        // Process the invoice
        await this.handleMessage(restaurantData);

        // Acknowledge the message
        this.channel.ack(msg);
      }
    });
  }

  async handleMessage(restaurantData: any) {
    const restaurant = await prisma.restaurants.update({
      where: {
        id: restaurantData.id,
      },
      data: {
        totalOrder: {
          increment: restaurantData.totalOrder,
        },
      },
    });
    console.log("Restaurant Details:", restaurant);
  }
}
