import { BaseRoute } from "../utils/BaseRoute";
import UserController from "./UserController";

export default class UserRoute extends BaseRoute {
    private userController: UserController;
    constructor(userController: UserController) {
        super();
        this.userController = userController;
        this.autoBindControllerMethods(this.userController);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.userController.getAllUsers);
        this.router.get("/:userId", this.userController.getUserById);
        // this.router.post("/", this.userController.createUser);
        // this.router.put("/:userId", this.userController.updateUser);
        // this.router.delete("/:userId", this.userController.deleteUser);
    }
}