
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isTokenRevoked } from "../utils/blackListToken";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

interface CustomRequest extends Request {
    user?: JwtPayload | string;
}

async function refreshToken(req: CustomRequest, res: Response, next: NextFunction) {
    // Kiểm tra xem có accessToken hợp lệ hay không
    const accessToken = req.cookies?.accessToken;
    if (accessToken) {
        try {
            // Xác thực accessToken
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string);
            // Nếu accessToken hợp lệ, tiếp tục qua middleware tiếp theo
            return next();
        } catch (err) {
            // Nếu accessToken hết hạn, tiếp tục thực hiện với refreshToken
        }
    }

    // Nếu không có accessToken hoặc accessToken hết hạn, xử lý với refreshToken
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is missing" });
    }

    try {
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET as string,
            async (err: any, decodedRefresh: any) => {
                if (err) {
                    return res.status(403).json({ error: "Invalid refresh token" });
                }

                // Tạo mới accessToken
                const newAccessToken = jwt.sign(
                    {
                        userId: decodedRefresh.userId,
                        role: decodedRefresh.role,
                    },
                    process.env.JWT_ACCESS_TOKEN_SECRET as string,
                    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION || "30m" }
                );

                // Lưu accessToken mới vào cookie
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
                    maxAge: 30 * 60 * 1000, // 30 phút
                });

                (req as any).userData = decodedRefresh;
                return next();
            }
        );
    } catch (err) {
        return res.status(403).json({ error: "Failed to refresh token" });
    }
}


export default refreshToken;