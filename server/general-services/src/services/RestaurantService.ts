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

  public getAllRestaurants = async (page: number, pageSize: number) => {
    return await prisma.restaurants.findMany(
      {
        skip: (page - 1) * pageSize,
        take: pageSize,
      }
    )
  }

  public getMenuByRestaurant = async (id: string) => {
    const foods = await prisma.foods.findMany({
      where: {
        restaurantId: id,
      },
      include: {
        Categories: true, // Fetch the category details
      },
    });

    // Group foods by category
    const groupedMenu = foods.reduce((menu, food) => {
      const categoryName = food.Categories?.name || "Other";
      if (!menu[categoryName]) {
        menu[categoryName] = [];
      }
      menu[categoryName].push({
        id: food.id,
        name: food.name,
        price: food.price,
        description: food.description,
        imageUrl: food.imageUrl,
        quantity: food.quantity,
      });
      return menu;
    }, {} as Record<string, Array<any>>);

    return groupedMenu;
  };

  public getFoodByCategory = async (restaurantId: string, categoryId: number) => {
    return await prisma.foods.findMany({
      where: {
        restaurantId,
        categoryId,
      },
    });
  };

  public get6FoodsBestSeller = async (restaurantId: string) => {
    return await prisma.foods.findMany({
      where: {
        restaurantId
      },
      orderBy: {
        price: "desc",
      },
      take: 6,
    })
  }


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
