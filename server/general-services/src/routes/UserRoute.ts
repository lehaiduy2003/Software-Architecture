import UserController from "../controllers/UserController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import UserService from "../services/UserService";
import { BaseRoute } from "../utils/BaseRoute";

class UserRoute extends BaseRoute {
  private userController: UserController;
  constructor(userController: UserController) {
    super();
    this.userController = userController;
    this.autoBindControllerMethods(this.userController);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", authenticate, this.userController.getAllUsers);
    this.router.get("/:userId", authenticate, this.userController.getUserById);
    this.router.put("/", authenticate, this.userController.updateUser);
    this.router.delete("/:userId", authenticate, authorize([""]), this.userController.deleteUser);
  }
}

const createUsersRoute = () => {
  const userService = new UserService();
  const userController = new UserController(userService);
  return new UserRoute(userController);
};

export default createUsersRoute;
