import { BaseRoute } from "../utils/BaseRoute";
import AccountController from "./AccountController";

export default class AccountRoute extends BaseRoute {
    private accountController: AccountController;
    constructor(userController: AccountController) {
        super();
        this.accountController = userController;
        this.autoBindControllerMethods(this.accountController);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.accountController.getAllUsers);
        this.router.get("/:userId", this.accountController.getUserById);
        // ...
    }
}