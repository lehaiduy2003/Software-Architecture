import { log } from "console";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../../prisma/database";
dotenv.config();

export default class AuthService {
  public login = async (phoneNumber: string, password: string) => {
    const user = await prisma.users.findUnique({
      where: {
        phone: phoneNumber,
        password: password,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  };

  public register = async (phoneNumber: string, fullName: string, password: string) => {
    const user = await prisma.users.create({
      data: {
        phone: phoneNumber,
        name: fullName,
        password: password,
        email: "",
        roleId: 3,
      },
    });
    return user;
  };

  public generateAccessToken = async (userId: number, role: string) => {
    try {
      const payload = { userId, role };
      const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
      });
      return token;
    } catch (error) {
      log("Error generating access token:", error);
      throw new Error("Failed to generate access token");
    }
  };

  public generateRefreshToken = async (userId: number, role: string) => {
    try {
      const payload = { userId, role };
      const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      });
      return token;
    } catch (error) {
      log("Error generating refresh token:", error);
      throw new Error("Failed to generate refresh token");
    }
  };
}
