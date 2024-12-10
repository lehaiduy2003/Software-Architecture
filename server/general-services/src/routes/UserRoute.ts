import UserController from "../controllers/UserController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import refreshToken from "../middlewares/refreshToken";
import verifyToken from "../middlewares/verifyToken";
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
    this.router.get("/", verifyToken, refreshToken, authenticate, authorize(["getAllUsers"]), this.userController.getAllUsers);
    this.router.get("/:userId", verifyToken, refreshToken, authenticate, authorize(["getUserById"]), this.userController.getUserById);
    this.router.put("/", verifyToken, refreshToken, authenticate, authorize(["updateUser"]), this.userController.updateUser);
    this.router.delete("/:userId", verifyToken, refreshToken, authenticate, authorize(["deleteUser"]), this.userController.deleteUser);
  }
}

const createUsersRoute = () => {
  const userService = new UserService();
  const userController = new UserController(userService);
  return new UserRoute(userController);
};

export default createUsersRoute;
