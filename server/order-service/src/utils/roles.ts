import { ERoles, getRoleLabel } from "./interfaces/IUser";

export const RolePermissions: Record<string, string[]> = {
    [getRoleLabel(ERoles.ADMIN)]: [
        "create",
        "read",
        "update",
        "delete"
    ],

    [getRoleLabel(ERoles.RESTAURANT_MANAGER)]: [
        "create",
        "read",
        "update",
        "delete"
    ],

    [getRoleLabel(ERoles.CUSTOMER)]: [
        "createOrder",
    ],

    [getRoleLabel(ERoles.OWNER)]: [
        "read"
    ]
};
