import { Request, Response } from "express";
import { BaseController } from "../utils/BaseController";
import UserService from "../services/UserService";

export default class UserController extends BaseController {
  private userService: UserService;
  constructor(userService: UserService) {
    super();
    this.userService = userService;
  }

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      if (!users) {
        return this.sendResponse(res, 200, { success: false, result: [] });
      }
      return this.sendResponse(res, 200, users);
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return this.sendResponse(res, 400, { success: false, result: {} });
      }
      return this.sendResponse(res, 200, user);
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };
}
