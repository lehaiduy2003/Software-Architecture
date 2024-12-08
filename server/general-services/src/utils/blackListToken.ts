import { log } from "console";
import redisClient from "../config/redisClient";

// Hàm thêm token vào danh sách đen
async function addToBlacklist(jti: string, exp: number): Promise<void> {
    const ttl = exp - Math.floor(Date.now() / 1000); // Thời gian sống còn lại
    if (ttl > 0) {
        await redisClient.set(jti, "revoked", { "EX": ttl });
    }
}

// Kiểm tra xem token có bị thu hồi không
async function isTokenRevoked(jti: string): Promise<boolean> {
    const result = await redisClient.get(jti);
    return result === "revoked";
}

export { addToBlacklist, isTokenRevoked };
