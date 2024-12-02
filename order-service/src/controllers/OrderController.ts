import { Request, Response } from "express";
import { orderService } from "../services/OrderService";

class OrderController {
  async getOrderList(req: Request, res: Response): Promise<Response> {
    const orders = await orderService.getAllOrders();
    return res.json(orders);
  }

  async createOrder(req: Request, res: Response): Promise<Response> {
    const order = await orderService.createOrder(req.body);
    return res.status(201).json(order);
  }
}

export const orderController = new OrderController();
