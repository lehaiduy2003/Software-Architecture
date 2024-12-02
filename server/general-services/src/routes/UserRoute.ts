import UserController from "../controllers/UserController";
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
    this.router.get("/users", this.userController.getAllUsers);
    this.router.get("/users/:userId", this.userController.getUserById);
    // this.router.post("/", this.userController.createUser);
    // this.router.put("/:userId", this.userController.updateUser);
    // this.router.delete("/:userId", this.userController.deleteUser);
  }
}

const createUsersRoute = () => {
  const userService = new UserService();
  const userController = new UserController(userService);
  return new UserRoute(userController);
};

export default createUsersRoute;
