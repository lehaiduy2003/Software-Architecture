import { Router } from "express";
import { BaseRoute } from "../utils/BaseRoute";
import FoodController from "../controllers/FoodController";
import FoodService from "../services/FoodService";
import { authenticate } from "../middlewares/authenticate";
import verifyToken from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import refreshToken from "../middlewares/refreshToken";

class FoodRoute extends BaseRoute {
  private foodController: FoodController;
  constructor(foodController: FoodController) {
    super();
    this.foodController = foodController;
    this.router = Router();
    this.autoBindControllerMethods(this.foodController);
    this.initRoutes();
  }

  private initRoutes() {
    // this.router.get("/", authenticate, this.foodController.getAllFood);
    this.router.get("", this.foodController.getFoodsByCategoryAndRestaunrant);
    this.router.get("/:foodId", this.foodController.getFoodById);
    this.router.post("/", verifyToken, refreshToken, authenticate, authorize(["createFood"]), this.foodController.createFood);
    this.router.put("/:foodId", verifyToken, refreshToken, authenticate, authorize(["updateFood"]), this.foodController.updateFood);
    this.router.delete("/:foodId", verifyToken, refreshToken, authenticate, authorize(["deleteFood"]), this.foodController.deleteFood);
    this.router.put("/update-food-quantity/:foodId", verifyToken, refreshToken, authenticate, authorize(["updateFoodQuantity"]), this.foodController.updateFoodQuantity);
  }
}

const createFoodRoute = () => {
  const foodService = new FoodService();
  const foodController = new FoodController(foodService);
  return new FoodRoute(foodController);
};

export default createFoodRoute;
