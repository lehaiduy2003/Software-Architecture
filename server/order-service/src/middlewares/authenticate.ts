import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { log } from "console";

dotenv.config();

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const accessToken = (await req.cookies["accessToken"]) || req.headers["authorization"]?.split(" ")[1];
    const refreshToken = (await req.cookies["refreshToken"]) || req.headers["x-refresh-token"];

    log("accessToken", accessToken);
    log("refreshToken", refreshToken);

    // Nếu không có accessToken, kiểm tra refreshToken
    if (accessToken) {
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string, (err: any, decodedToken: any) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token!" });
            }
            (req as any).userData = decodedToken; // Gắn thông tin người dùng vào req
            return next();
        });
    } else if (refreshToken) {
        // Nếu không có accessToken nhưng có refreshToken
        return next();  // Chuyển qua middleware tái tạo token
    } else {
        // Trường hợp không có accessToken và refreshToken
        res.status(401).json({ message: "Authentication required!" });
        return;
    }
};