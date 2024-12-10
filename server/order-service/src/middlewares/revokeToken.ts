
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isTokenRevoked } from "../utils/blackListToken";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

interface CustomRequest extends Request {
    user?: JwtPayload | string;
}

async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    log("token: ", req.headers.cookies);
    try {
        const authHeader = req.headers;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        if (!authHeader.cookie) {
            return res.status(401).json({ error: "Cookie is missing" });
        }
        const cookiesString = authHeader.cookie as string;
        const token = cookiesString.split("; ").find(cookie => cookie.startsWith("accessToken="))?.split("=")[1];
        if (!token) {
            return res.status(401).json({ error: "Token is missing" });
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload;
        // Check if the token is revoked
        const revoked = await isTokenRevoked(decoded.jti as string);
        if (revoked) {
            return res.status(401).json({ success: false, error: "Token has been revoked" });
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

export default verifyToken;
