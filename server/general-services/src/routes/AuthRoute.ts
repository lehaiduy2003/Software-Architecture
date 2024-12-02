import { BaseRoute } from "../utils/BaseRoute";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";

class AuthRoute extends BaseRoute {
  private authController: AuthController;

  constructor(authController: AuthController) {
    super();
    this.authController = authController;
    this.autoBindControllerMethods(this.authController);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
    this.router.post("/logout", this.authController.logout);
  }
}

const createAuthRoute = () => {
  const authService = new AuthService();
  const authController = new AuthController(authService);
  return new AuthRoute(authController);
};

export default createAuthRoute;
