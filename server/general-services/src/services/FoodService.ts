import prisma from "../../prisma/database";
import amqp from "amqplib";
import dotenv from "dotenv";
import { Food } from "../libs/zod/types/FoodValidation";
import { log } from "console";

dotenv.config();

export default class FoodService {
  private channel!: amqp.Channel;

  constructor() {
    this.connectRabbitMQ();
  }

  // Connect to RabbitMQ and start listening to the queue
  private async connectRabbitMQ() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue("order-food-queue", { durable: true });
      this.channel.consume("order-food-queue", this.handleOrder.bind(this), { noAck: false });
      console.log("Food Service is listening to the queue");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
    }
  }

  // Handle the incoming order from the Order Service
  private async handleOrder(msg: amqp.ConsumeMessage | null) {
    if (msg) {
      const orderData = JSON.parse(msg.content.toString());
      console.log("Received order from Order Service:", orderData);

      // Process order (example: check food availability, etc.)
      const foodDetails = await prisma.foods.findMany({
        where: { id: { in: orderData.foodIds } }, // Example: Fetch food details based on order
      });

      console.log("Food Details:", foodDetails);

      // Send acknowledgment after processing
      this.channel.ack(msg);
    }
  }

  async getAllFoods() {
    return await prisma.foods.findMany();
  }

  public createFood = async (data: Food) => {

    return await prisma.foods.create({
      data: data
    });
  }
  public getFoodById = async (id: string) => {
    const f = await prisma.foods.findUnique({
      where: {
        id: id,
      },
    });
    return f;
  };
  public updateFood = async (id: string, data: any) => {
    const f = await prisma.foods.update({
      where: {
        id: id,
      },
      data: data,
    });
    return f;
  };

  public updateQuantity = async (foodId: string, quantity: number) => {
    return await prisma.foods.update({
      where: {
        id: foodId,
      },
      data: {
        quantity: quantity,
      },
    });
  }

  public deleteFood = async (id: string) => {
    const f = await prisma.foods.delete({
      where: {
        id: id,
      },
    });
    return f;
  };

  async getFoodsByCategoryAndRestaunrant(categoryId: number, restaurantId: string) {
    log("category", categoryId);
    log("restaurant", restaurantId);
    let foods = [];
    if (categoryId < 0) {
      foods=  await prisma.foods.findMany(
        {
          where: {
            restaurantId: restaurantId
          }
        }
      )
    } else {
      foods = await prisma.foods.findMany({
        where: {
          restaurantId: restaurantId,
          categoryId: categoryId,
        },
      });
    }
    return foods;
  }
}
