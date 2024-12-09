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
    this.router.get("/all", this.restaurantController.getAllRestaurants); // GET /restaurants?page=1&pageSize=10
    this.router.get("/best-seller/:restauranId", this.restaurantController.getBestSeller); // GET /restaurants/best-seller/abc, restauranId is string
    this.router.get("/:restauranId", this.restaurantController.getMenuByRestaurant); // GET /restaurants/123
    this.router.get("/:restauranId/:categoryId", this.restaurantController.getFoodByCategory); // GET /restaurants/abc/123, restauranId is string, categoryId is number
  }
}

const createRestaurantsRoute = () => {
  const restaurantService = new RestaurantService();
  const restaurantController = new RestaurantController(restaurantService);
  return new RestaurantRoute(restaurantController);
};

export default createRestaurantsRoute;
