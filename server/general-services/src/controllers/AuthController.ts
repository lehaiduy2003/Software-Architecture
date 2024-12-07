import { sendEmail } from './../utils/mailer';
import { log } from "console";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../utils/BaseController";
import dotenv from "dotenv";
import { IUser } from "../utils/interfaces/IUser";
import { setAuthCookies } from "../middlewares/authenticate";
import AuthService from "../services/AuthService";
import { comparePassword } from "../utils/encoded";
import redisClient from "../config/redisClient";
dotenv.config();

export default class AuthController extends BaseController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    super();
    redisClient.connect();
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
      // Save the IP address to the user's login history (assuming you have a service for this)
      const ipAddress = req.ip;
      const userAgent = req.headers["user-agent"];

      // Lưu thông tin đăng nhập vào bảng LoginHistory
      await this.authService.saveLoginHistory(user.id, userAgent as string, ipAddress as string);
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

      const user = await this.authService.getUserByPhoneNumber(phoneNumber);

      if (!user) {
        return this.sendError(res, 401, "Invalid phone number or password");
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return this.sendError(res, 401, "Invalid phone number or password");
      }

      const userAgent = req.headers["user-agent"];
      const ipAddress = req.ip;

      console.log("userAgent: ", userAgent);
      console.log("IP Address: ", ipAddress);

      const history = await this.authService.getLoginHistory(user.id);

      if (history.ipAddress == ipAddress && history.userAgent == userAgent) {
        // Lưu thông tin đăng nhập vào bảng LoginHistory
        await this.authService.saveLoginHistory(user.id, userAgent as string, ipAddress as string);
        await setAuthCookies(req, res, user.id);
        return this.sendResponse(res, 200, { success: true, message: "Logged in successfully" });
      }

      // Nếu phát hiện sự khác biệt về IP/Browser, gửi mã OTP xác thực
      log("Unusual login detected. Sending OTP to email...");
      const otp = crypto.randomInt(1000, 9999).toString(); // Tạo OTP 4 chữ số

      // Lưu mã OTP vào Redis với thời gian hết hạn là 5 phút
      await redisClient.setEx(`otp:${user.phone}`, 300, otp);

      // Lưu thông tin người dùng vào session
      (req as any).session.userPhone = user.phone;

      // Gửi OTP qua email
      await sendEmail(user.email, 'OTP for Login Verification', `Your OTP is: ${otp}. It will expire in 5 minutes.`);

      return this.sendResponse(res, 401, {
        success: false,
        message: "Unusual login detected. Please enter the OTP sent to your email."
      });
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  // Xác thực mã OTP mà không cần userId
  public validLogin = async (req: Request, res: Response) => {
    const { otp } = req.body; // Chỉ cần mã OTP người dùng nhập
    log("OTP: ", otp);
    if (!otp) {
      return this.sendError(res, 400, "OTP is required");
    }

    try {
      // Lấy thông tin người dùng từ session
      const userPhone = (req as any).session.userPhone;
      log("User phone from session: ", userPhone);
      if (!userPhone) {
        return this.sendError(res, 400, "Session expired. Please login again.");
      }

      // Kiểm tra mã OTP trong Redis
      const storedOtp = await redisClient.get(`otp:${userPhone}`);
      log("Stored OTP: ", storedOtp);
      if (!storedOtp) {
        return this.sendError(res, 400, "OTP has expired or is invalid.");
      }

      // Kiểm tra mã OTP nhập vào có khớp không
      if (Number(storedOtp) !== otp) {
        return this.sendResponse(res, 400, { success: false, message: "Invalid OTP" });
      }

      // Đăng nhập thành công, set cookie và trả về phản hồi
      const user = await this.authService.getUserByPhoneNumber(userPhone);
      if (!user) return this.sendError(res, 400, "User not found");
      await setAuthCookies(req, res, user.id);

      // Xóa mã OTP khỏi Redis sau khi sử dụng
      await redisClient.del(`otp:${userPhone}`);

      return this.sendResponse(res, 200, { success: true, message: "Login verified successfully" });
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public logout = async (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
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
