import dotenv from "dotenv";
dotenv.config();

import amqp from "amqplib";
import prisma from "../../prisma/database";

dotenv.config();

export default class InvoiceService {
  async getInvoiceById(invoiceId: string) {
    return await prisma.invoices.findUnique({
      where: {
        id: invoiceId,
      },
    });
  }
  private channel!: amqp.Channel;

  constructor() {
    this.connectToRabbitMQ();
  }

  async connectToRabbitMQ() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
      this.channel = await connection.createChannel();

      // Ensure the queue exists
      await this.channel.assertQueue("invoice-queue", { durable: true });
      console.log("invoice-queue activated");

      console.log("Connected to RabbitMQ");

      // Set up the consumer
      this.consumeMessages();
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
    }
  }

  async consumeMessages() {
    this.channel.consume("invoice-queue", async (msg: any) => {
      if (msg !== null) {
        const invoice = JSON.parse(msg.content.toString());
        console.log("Received invoice:", invoice);

        // Process the invoice
        await this.processInvoice(invoice);

        // Acknowledge the message
        this.channel.ack(msg);
      }
    });
  }

  async processInvoice(invoice: any) {
    // Implement your invoice processing logic here
    await this.createInvoice(invoice);
    console.log("Invoice processed:", invoice);
  }

  private async createInvoice(data: any) {
    const invoice = await prisma.invoices.create({
      data: data,
    });

    return invoice;
  }

  async getInvoices() {
    return await prisma.invoices.findMany();
  }
}
