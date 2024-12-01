import { ERoles } from "./interfaces/IUser";

export const RolePermissions: Record<ERoles, string[]> = {
    [ERoles.ADMIN]: [
        "create",
        "read",
        "update",
        "delete"
    ],

    [ERoles.RESTAURANT_MANAGER]: [
        "create",
        "read",
        "update",
        "delete"
    ],

    [ERoles.CUSTOMER]: [
        "read"
    ],

    [ERoles.SHIPPER]: [
        "read"
    ],

    [ERoles.OWNER]: [
        "read"
    ]
};
