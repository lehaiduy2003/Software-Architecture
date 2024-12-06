import StripeController from "../controllers/StripeController";
import StripeService from "../services/StripeService";
import { BaseRoute } from "../utils/BaseRoute";

class StripeRoute extends BaseRoute {
  private readonly stripeController: StripeController;
  constructor(stripeController: StripeController) {
    super();
    this.stripeController = stripeController;
    this.autoBindControllerMethods(this.stripeController);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/checkout", this.stripeController.checkout);
  }
}

// /stripe/
const createStripeRoute = () => {
  const stripeService = new StripeService();
  const stripeController = new StripeController(stripeService);
  return new StripeRoute(stripeController);
};

export default createStripeRoute;
