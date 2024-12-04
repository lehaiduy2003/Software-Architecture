import { log } from "console";
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../utils/BaseController";
import dotenv from "dotenv";
import { IUser } from "../utils/interfaces/IUser";
import { setAuthCookies } from "../middlewares/authenticate";
import AuthService from "../services/AuthService";
dotenv.config();

export default class AuthController extends BaseController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    super();
    this.authService = authService;
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.body);

      const { phoneNumber, fullName, password, email } = req.body;
      if (!phoneNumber || !fullName || !password || !email) {
        return this.sendError(res, 400, "Phone number, email, full name and password are required");
      }

      const user = await this.authService.register(email, phoneNumber, fullName, password);
      if (!user) {
        return this.sendError(res, 400, "Failed to register");
      }
      // Set cookies
      await setAuthCookies(req, res, user.id);
      return this.sendResponse(res, 201, { success: true, message: "Registered successfully" });
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phoneNumber, password } = req.body;
      if (!phoneNumber || !password) {
        return this.sendError(res, 400, "Phone number and password are required");
      }

      const user = await this.authService.login(phoneNumber, password);
      if (!user) {
        return this.sendError(res, 401, "Invalid phone number or password");
      }
      // Set cookies
      await setAuthCookies(req, res, user.id);
      return this.sendResponse(res, 200, { success: true, message: "Logged in successfully" });
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return this.sendError(res, 500, "Logout failed");
      }
      // Clear cookies
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      // Clear the session cookie (connect.sid)
      res.clearCookie("connect.sid", { path: "/" });
      log("Logged out successfully");
      this.sendResponse(res, 200, {
        success: true,
        message: "Logged out successfully",
      });
    });
  };
}
