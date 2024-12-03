import { Application, NextFunction, Request, Response, Router } from "express";
import FoodService from "./food/FoodService";
import FoodController from "./food/FoodController";
import FoodRoute from "./food/FoodRoute";
import AccountController from "./account/AccountController";
import AccountRoute from "./account/AccountRoute";
import AccountService from "./account/AccountService";
import InvoiceController from "./invoice/InvoiceController";
import InvoiceRoute from "./invoice/InvoiceRoute";
import InvoiceService from "./invoice/InvoiceService";
import AuthService from "./auth/AuthService";
import AuthController from "./auth/AuthController";
import AuthRoutes from "./auth/AuthRoute";

class GeneralRoutes {
    public router: Router;
    private authServices: AuthService;
    private foodServices: FoodService;
    private userServices: AccountService;
    private invoiceServices: InvoiceService;
    constructor() {
        this.router = Router();
        this.authServices = new AuthService();
        this.foodServices = new FoodService();
        this.userServices = new AccountService();
        this.invoiceServices = new InvoiceService();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.use("/auth", this.lazyLoadAuthRoutes());
        this.router.use("/foods", this.lazyLoadFoodRoutes());
        this.router.use("/accounts", this.lazyLoadAccountRoutes());
        this.router.use("/invoices", this.lazyLoadInvoiceRoutes());
    }

    private lazyLoadAuthRoutes() {
        return (req: Request, res: Response, next: NextFunction) => {
            const authControllers = new AuthController(this.authServices);
            const authRouter = new AuthRoutes(authControllers);
            authRouter.getRouter()(req, res, next);
        };
    }

    private lazyLoadFoodRoutes() {
        return (req: Request, res: Response, next: NextFunction) => {
            const foodControllers = new FoodController(this.foodServices);
            const foodRouter = new FoodRoute(foodControllers);
            foodRouter.getRouter()(req, res, next);
        };
    }

    private lazyLoadAccountRoutes() {
        return (req: Request, res: Response, next: NextFunction) => {
            const userControllers = new AccountController(this.userServices);
            const userRouter = new AccountRoute(userControllers);
            userRouter.getRouter()(req, res, next);
        };
    }

    private lazyLoadInvoiceRoutes() {
        return (req: Request, res: Response, next: NextFunction) => {
            const invoiceControllers = new InvoiceController(this.invoiceServices);
            const invoiceRouter = new InvoiceRoute(invoiceControllers);
            invoiceRouter.getRouter()(req, res, next);
        };
    }
}

export default new GeneralRoutes().router