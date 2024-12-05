import prisma from "../../prisma/database";
import amqp from "amqplib";
import dotenv from "dotenv";

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
            console.log("Food Service is listening to the queue");
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
    }

    async handleMessage(msg: amqp.ConsumeMessage | null) {
        if (msg) {
            const restaurantData = JSON.parse(msg.content.toString());
            console.log("Received restaurant from Restaurant Service:", restaurantData);
            const restaurant = await prisma.restaurants.update({
                where: {
                    id: restaurantData.id,
                },
                data: {
                    totalOrder: {
                        increment: 1,
                    },
                }
            });
            console.log("Restaurant Details:", restaurant);
            this.channel.ack(msg);
        }
    }
}