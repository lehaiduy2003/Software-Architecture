import { log } from "console";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../../prisma/database";
import { ERoles } from "../utils/interfaces/IUser";
import { comparePassword, encode } from "../utils/encoded";
import redisClient from "../config/redisClient";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

export default class AuthService {
  public login = async (phoneNumber: string, password: string) => {
    const user = await prisma.users.findUnique({
      where: {
        phone: phoneNumber,
      },
    });
    if (!user) {
      return null;
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return null;
    }
    return user;
  };

  public register = async (
    email: string,
    phoneNumber: string,
    fullName: string,
    password: string
  ) => {
    const hashedPassword = await encode(password);
    const user = await prisma.users.create({
      data: {
        phone: phoneNumber,
        name: fullName,
        password: hashedPassword,
        email: email,
        roleId: ERoles.CUSTOMER,
      },
    });
    return user;
  };

  // public saveLoginHistory = async (userId: string, agentUser: string, ipAddress: string) => {
  //   // Check nếu đã tồn tại userId thì cập nhật lại, ngược lại thì tạo mới
  //   const loginHistory = await prisma.loginHistory.findMany({
  //     where: {
  //       userId: userId,
  //     },
  //   });
  //   if (loginHistory.length > 0) {
  //     await prisma.loginHistory.update({
  //       where: {
  //         id: loginHistory[0].id,
  //       },
  //       data: {
  //         userAgent: agentUser,
  //         ipAddress: ipAddress,
  //       },
  //     });
  //   } else {
  //     await prisma.loginHistory.create({
  //       data: {
  //         userId: userId,
  //         userAgent: agentUser,
  //         ipAddress: ipAddress,
  //       },
  //     });
  //   }
  // }

  public generateAccessToken = async (userId: string, role: string) => {
    try {
      const payload = { userId, role, jti: uuidv4() };
      const token = jwt.sign(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        }
      );
      log("Access token generated: ", token);
      return token;
    } catch (error) {
      log("Error generating access token:", error);
      throw new Error("Failed to generate access token");
    }
  };

  public generateRefreshToken = async (userId: string, role: string) => {
    try {
      const payload = { userId, role, jti: uuidv4() };
      const token = jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        }
      );
      return token;
    } catch (error) {
      log("Error generating refresh token:", error);
      throw new Error("Failed to generate refresh token");
    }
  };

  public getUserByPhoneNumber = async (phoneNumber: string) => {
    const user = await prisma.users.findUnique({
      where: {
        phone: phoneNumber,
      },
    });
    return user;
  };

  // public getLoginHistory = async (userId: string): Promise<any> => {
  //   const loginHistory = await prisma.loginHistory.findMany({
  //     where: {
  //       userId: userId,
  //     },
  //   });
  //   return loginHistory[0];
  // };
}
