import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();
export default abstract class RabbitmqService {
  private channel!: amqp.Channel;
  private connection!: amqp.Connection;

  abstract consume(): Promise<void>;
  abstract publishInQueue(queue: string, message: string): void;
  abstract publishInExchange(exchange: string, routingKey: string, message: string): void;

  constructor() {}

  async connect() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
      console.log("Connected to RabbitMQ");
    } catch (error) {
      throw error;
    }
  }

  async createChannel() {
    try {
      this.channel = await this.connection.createChannel();
      console.log("Channel created");
    } catch (error) {
      throw error;
    }
  }

  async checkQueue(queue: string) {
    return this.channel.checkQueue(queue);
  }

  async checkExchange(exchange: string) {
    return this.channel.checkExchange(exchange);
  }

  async assertQueue(queue: string) {
    await this.channel.assertQueue(queue);
  }

  async assertExchange(exchange: string, type: string) {
    await this.channel.assertExchange(exchange, type);
  }

  async bindQueue(queue: string, exchange: string, routingKey: string) {
    await this.channel.bindQueue(queue, exchange, routingKey);
  }

  async close() {
    await this.channel.close();
  }

  async ack(message: amqp.Message) {
    this.channel.ack(message);
  }

  async nack(message: amqp.Message) {
    this.channel.nack(message);
  }

  async sendToQueue(queue: string, message: string) {
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async sendToExchange(exchange: string, routingKey: string, message: string) {
    this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consumeQueue(queue: string, callback: (message: amqp.Message | null) => void) {
    this.channel.consume(queue, callback);
  }

  async consumeExchange(
    exchange: string,
    routingKey: string,
    callback: (message: amqp.Message) => void
  ) {
    this.channel.consume(
      "",
      (message) => {
        if (message) {
          callback(message);
        }
      },
      { noAck: true }
    );
    this.channel.bindQueue("", exchange, routingKey);
  }

  async consumeExchangeWithAck(
    exchange: string,
    routingKey: string,
    callback: (message: amqp.Message) => void
  ) {
    this.channel.consume(
      "",
      (message) => {
        if (message) {
          callback(message);
        }
      },
      { noAck: false }
    );
    this.channel.bindQueue("", exchange, routingKey);
  }

  async consumeQueueWithAck(queue: string, callback: (message: amqp.Message) => void) {
    this.channel.consume(queue, (message) => {
      if (message) {
        callback(message);
      }
    });
  }

  async sendToQueueWithAck(queue: string, message: string) {
    this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  }

  async sendToExchangeWithAck(exchange: string, routingKey: string, message: string) {
    this.channel.publish(exchange, routingKey, Buffer.from(message), { persistent: true });
  }

  async ackMessage(message: amqp.Message) {
    this.channel.ack(message);
  }

  async nackMessage(message: amqp.Message) {
    this.channel.nack(message);
  }

  async rejectMessage(message: amqp.Message) {
    this.channel.reject(message, false);
  }

  async bindQueueToExchange(queue: string, exchange: string, routingKey: string) {
    this.channel.bindQueue(queue, exchange, routingKey);
  }

  async unbindQueueFromExchange(queue: string, exchange: string, routingKey: string) {
    this.channel.unbindQueue(queue, exchange, routingKey);
  }

  async deleteQueue(queue: string) {
    this.channel.deleteQueue(queue);
  }

  async deleteExchange(exchange: string) {
    this.channel.deleteExchange(exchange);
  }

  async purgeQueue(queue: string) {
    this.channel.purgeQueue(queue);
  }

  async reconnect() {
    await this.connection.close();
    this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
    this.channel = await this.connection.createChannel();
  }

  async acknowledgeMessage(message: amqp.Message) {
    this.channel.ack(message);
  }
}
