import { Request, Response } from "express";
import { orderService } from "../services/OrderService";
import { validateOrder } from "../libs/zod/types/Order";
import { validateOrderedFood } from "../libs/zod/types/OrderedFood";
import { log } from "console";

export class OrderController {
  async getOrderById(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;
      const orders = await orderService.getById(orderId);
      res.json(orders);
    } catch (error) {
      res.status(400).json({ success: false, message: "error when get orders by id" });
      throw error;
    }
  }
  async getOrderList(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(400).json({ success: false, message: "error when get orders" });
      throw error;
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { paymentMethod, paymentStatus, restaurantId, foods } = req.body;

      const { userId } = (req as any).userData;
      log("userId", userId);

      const parsedFoods = foods.map((food: any) => validateOrderedFood(food));
      const orderData = validateOrder({ paymentMethod, paymentStatus, userId });
      const data = await orderService.createOrder(restaurantId, orderData, parsedFoods);
      res.status(201).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, message: "error when create order" });
      throw error;
    }
  }
}
