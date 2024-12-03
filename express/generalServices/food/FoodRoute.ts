import { Router } from "express";
import { BaseRoute } from "../utils/BaseRoute";
import FoodController from "./FoodController";
import { authenticate } from "../middlewares/Authenticate";

export default class FoodRoute extends BaseRoute {
    private foodController: FoodController;
    constructor(foodController: FoodController) {
        super();
        this.foodController = foodController;
        this.router = Router();
        this.autoBindControllerMethods(this.foodController);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/get-all-restaurants", this.foodController.getAllRestaurants);
        this.router.get("/:restaurantId/menu", this.foodController.getMenuByRestaurantId);
        this.router.get("/", this.foodController.getAllFood);
        this.router.get("/:foodId", this.foodController.getFoodById);
        this.router.post("/", this.foodController.createFood);
        this.router.put("/:foodId", this.foodController.updateFood);
        this.router.delete("/:foodId", this.foodController.deleteFood);
    }
}
