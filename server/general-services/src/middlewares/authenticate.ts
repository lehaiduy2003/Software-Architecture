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
    signed: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: '/',
    maxAge: 30 * 60 * 1000, // 30 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  // log("req before: ", res);
  (req as any).userData = { userId: String(user.id), role: user.roleId };

  // log("userData", (req as any).userData);
  // log("accessToken", req.cookies["accessToken"]);
  // log("refreshToken", req.cookies["refreshToken"]);
  // log("userData", (req as any).userData);
};

// JWT Authentication Middleware with proper refreshToken validation
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = await req.cookies["accessToken"] || req.headers["authorization"]?.split(" ")[1];
  const refreshToken = await req.cookies["refreshToken"] || req.headers["x-refresh-token"];

  log("accessToken", accessToken);
  log("refreshToken", refreshToken);

  // Nếu không có accessToken, kiểm tra refreshToken
  if (!accessToken && refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      async (refreshErr: any, decodedRefreshToken: any) => {
        if (refreshErr) {
          return res.status(403).json({ message: "Invalid refresh token!" });
        }

        // Tạo accessToken mới từ refreshToken
        const newAccessToken = jwt.sign(
          { userId: decodedRefreshToken.userId, role: decodedRefreshToken.role },
          process.env.JWT_ACCESS_TOKEN_SECRET as string,
          { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION || "30m" }
        );

        // Lưu lại accessToken mới vào cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          signed: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
          maxAge: 30 * 60 * 1000, // 30 phút
        });

        // Gắn thông tin người dùng vào request để tiếp tục xử lý
        (req as any).userData = decodedRefreshToken;
        return next();
      }
    );
  } else if (accessToken) {
    // Nếu có accessToken, xác thực nó
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      (err: any, decodedToken: any) => {
        if (err && err.name === "TokenExpiredError" && refreshToken) {
          // Nếu accessToken hết hạn và có refreshToken
          jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET as string,
            async (refreshErr: any, decodedRefreshToken: any) => {
              if (refreshErr) {
                return res.status(403).json({ message: "Invalid refresh token!" });
              }
              // Tạo accessToken mới từ refreshToken
              const newAccessToken = jwt.sign(
                { userId: decodedRefreshToken.userId, role: decodedRefreshToken.role },
                process.env.JWT_ACCESS_TOKEN_SECRET as string,
                { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION || "30m" }
              );
              res.clearCookie("accessToken");
              // Lưu lại accessToken mới vào cookie
              res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                signed: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
                maxAge: 30 * 60 * 1000, // 30 phút
              });

              // Gắn thông tin người dùng vào request để tiếp tục xử lý
              (req as any).userData = decodedRefreshToken;
              return next();
            }
          );
        } else if (err) {
          // Trường hợp accessToken không hợp lệ hoặc có lỗi khác
          return res.status(403).json({ message: "Invalid access token!" });
        } else {
          // Token hợp lệ, tiếp tục xử lý
          (req as any).userData = decodedToken;
          return next();
        }
      }
    );
  } else {
    // Trường hợp không có accessToken hoặc refreshToken
    res.status(401).json({ message: "Authentication required!" });
    return;
  }
};
