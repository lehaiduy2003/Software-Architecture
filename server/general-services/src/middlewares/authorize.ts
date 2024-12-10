import { Request, Response, NextFunction } from "express";
import { RolePermissions } from "../utils/roles";
import { log } from "console";
import { ERoles } from "../utils/interfaces/IUser";

export const authorize = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = (req as any).userData.role;
    log("userRole", userRole);
    const userPermissions = RolePermissions[userRole as ERoles] || [];
    log("userPermissions", userPermissions);
    // Kiểm tra quyền cần thiết có trong danh sách quyền của vai trò không
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );
    if (!hasPermission) {
      res.status(403).json({ message: "You are not allow access to this resource." });
      return;
    }
    log("hasPermission", hasPermission);
    next();
  };
};
