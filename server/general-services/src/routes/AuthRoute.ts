import { BaseRoute } from "../utils/BaseRoute";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import path from "path";
import { Request, Response } from "express";

class AuthRoute extends BaseRoute {
  private authController: AuthController;

  constructor(authController: AuthController) {
    super();
    this.authController = authController;
    this.autoBindControllerMethods(this.authController);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/f-login", this.serveLoginPage);
    this.router.get("/f-register", this.serveRegisterPage);
    this.router.get("/f-success", this.serveSuccessPage);
    this.router.get("/f-check-valid-login", this.serveValidLoginPage);


    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
    this.router.get("/valid-login", this.authController.validLogin);
    this.router.post("/logout", this.authController.logout);
  }

  private serveLoginPage(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  }

  public serveRegisterPage(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '../views/register.html'));
  }

  private serveSuccessPage(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '../views/success.html'));
  }

  private serveValidLoginPage(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '../views/valid-login.html'));
  }
}

const createAuthRoute = () => {
  const authService = new AuthService();
  const authController = new AuthController(authService);
  return new AuthRoute(authController);
};

export default createAuthRoute;
