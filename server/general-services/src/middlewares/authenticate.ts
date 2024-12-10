import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { log } from "console";
import prisma from "../../prisma/database";
import AuthService from "../services/AuthService";

dotenv.config();

export const setAuthCookies = async (
  req: Request,
  res: Response,
  userId: string
): Promise<void> => {
  const authService = new AuthService();
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    include: {
      Roles: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!user) {
    return;
  }
  const accessToken = await authService.generateAccessToken(user.id, user?.Roles.name);
  const refreshToken = await authService.generateRefreshToken(user.id, user?.Roles.name);
  // log("accessToken after", accessToken);
  // log("req after: ", res);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: 30 * 60 * 1000, // 30 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  // log("req before: ", res);
  (req as any).userData = { userId: String(user.id), role: user.roleId };

  // log("userData", (req as any).userData);
  // log("accessToken", req.cookies["accessToken"]);
  // log("refreshToken", req.cookies["refreshToken"]);
  // log("userData", (req as any).userData);
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // const accessToken = (await req.cookies["accessToken"]) || req.headers["authorization"]?.split(" ")[1];
  const refreshToken = (await req.cookies["refreshToken"]) || req.headers["x-refresh-token"];
  const accessToken = await req.cookies["accessToken"];
  log("accessToken", accessToken);
  log("refreshToken", refreshToken);

  // Nếu không có accessToken, kiểm tra refreshToken
  if (accessToken) {
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      (err: any, decodedToken: any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid access token!" });
        }
        (req as any).userData = decodedToken; // Gắn thông tin người dùng vào req
        return next();
      }
    );
  } else if (refreshToken) {
    // Nếu không có accessToken nhưng có refreshToken
    return next(); // Chuyển qua middleware tái tạo token
  } else {
    // Trường hợp không có accessToken và refreshToken
    res.status(401).json({ message: "Authentication required!" });
    return;
  }
};
