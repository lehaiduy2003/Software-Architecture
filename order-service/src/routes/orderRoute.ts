import { Router } from "express";
import { orderController } from "../controllers/OrderController";

const router = Router();

router.get("/", orderController.getOrderList);
router.post("/", orderController.createOrder);

export { router as orderRoutes };
