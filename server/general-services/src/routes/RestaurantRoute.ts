import { Router } from "express";
import { BaseRoute } from "../utils/BaseRoute";
import RestaurantService from "../services/RestaurantService";
import RestaurantController from "../controllers/RestaurantController";

class RestaurantRoute extends BaseRoute {
  private restaurantController: RestaurantController;
  constructor(restaurantController: RestaurantController) {
    super();
    this.restaurantController = restaurantController;
    this.router = Router();
    this.autoBindControllerMethods(this.restaurantController);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/top10", this.restaurantController.getTop10Restaurants);
  }
}

const createRestaurantsRoute = () => {
  const restaurantService = new RestaurantService();
  const restaurantController = new RestaurantController(restaurantService);
  return new RestaurantRoute(restaurantController);
};

export default createRestaurantsRoute;
