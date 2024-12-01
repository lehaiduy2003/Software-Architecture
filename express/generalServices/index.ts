import { Application, NextFunction, Request, Response, Router } from "express";
import FoodService from "./food/FoodService";
import FoodController from "./food/FoodController";
import FoodRoute from "./food/FoodRoute";
import UserController from "./user/UserController";
import UserRoute from "./user/UserRoute";
import UserService from "./user/UserService";

class GeneralRoutes {
    public router: Router;
    private foodServices: FoodService;
    private userServices: UserService;
    constructor() {
        this.router = Router();
        this.foodServices = new FoodService();
        this.userServices = new UserService();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.use("/foods", this.lazyLoadFoodRoutes());
        this.router.use("/users", this.lazyLoadUserRoutes());
    }

    private lazyLoadFoodRoutes() {
        return (req: Request, res: Response, next: NextFunction) => {
            const foodControllers = new FoodController(this.foodServices);
            const foodRouter = new FoodRoute(foodControllers);
            foodRouter.getRouter()(req, res, next);
        };
    }

    private lazyLoadUserRoutes() {
        return (req: Request, res: Response, next: NextFunction) => {
            const userControllers = new UserController(this.userServices);
            const userRouter = new UserRoute(userControllers);
            userRouter.getRouter()(req, res, next);
        };
    }
}

export default new GeneralRoutes().router