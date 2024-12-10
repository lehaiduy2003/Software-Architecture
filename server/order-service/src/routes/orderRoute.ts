import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { BaseRoute } from "../utils/BaseRoute";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import verifyToken from "../middlewares/revokeToken";

class OrderRouter extends BaseRoute {
  private readonly orderController: OrderController;

  constructor(orderController: OrderController) {
    super();
    this.orderController = orderController;
    this.router = Router();
    this.autoBindControllerMethods(this.orderController);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.orderController.getOrderList);
    this.router.get("/:orderId", this.orderController.getOrderById);
    this.router.post("/", verifyToken, authenticate, this.orderController.createOrder);
  }
}

const createOrderRoute = () => {
  const orderController = new OrderController();
  return new OrderRouter(orderController);
};

export default createOrderRoute;
