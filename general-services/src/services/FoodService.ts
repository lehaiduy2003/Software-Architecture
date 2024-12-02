import prisma from "../../prisma/database";
import amqp from "amqplib";
import dotenv from "dotenv";

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

  async createFood(data: any) {
    return await prisma.foods.create({
      data,
    });
  }
  public getFoodById = async (id: number) => {
    const f = await prisma.foods.findUnique({
      where: {
        id: id,
      },
    });
    return f;
  };
  public updateFood = async (id: number, data: any) => {
    const f = await prisma.foods.update({
      where: {
        id: id,
      },
      data: data,
    });
    return f;
  };

  public deleteFood = async (id: number) => {
    const f = await prisma.foods.delete({
      where: {
        id: id,
      },
    });
    return f;
  };
}
