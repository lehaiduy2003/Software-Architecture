
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isTokenRevoked } from "../utils/blackListToken";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

interface CustomRequest extends Request {
    user?: JwtPayload | string;
}

export default async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const accessToken = await req.cookies["accessToken"]  // Lấy accessToken từ cookies
        log("accessToken in verify: ", accessToken);
        if (!accessToken) {
            // Nếu không có accessToken, tiếp tục tới middleware tiếp theo (refreshToken)
            return next();
        }

        // Xác thực accessToken, bỏ qua expiration để kiểm tra blacklist trước
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
            ignoreExpiration: true,
        }) as jwt.JwtPayload;

        // Kiểm tra token có bị thu hồi không trong Redis blacklist
        const revoked = await isTokenRevoked(decoded.jti as string);
        if (revoked) {
            return res.status(401).json({ error: "Token has been revoked" });
        }

        // Kiểm tra token đã hết hạn chưa
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            return res.status(401).json({ error: "Token expired, re-authentication required" });
        }

        // Nếu token hợp lệ, gắn thông tin người dùng vào request
        (req as any).userData = decoded;
        next();  // Tiếp tục qua các middleware khác
    } catch (err) {
        log(err);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

