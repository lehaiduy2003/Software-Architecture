import { ERoles, getRoleLabel } from "./interfaces/IUser";

export const RolePermissions: Record<string, string[]> = {
    [getRoleLabel(ERoles.ADMIN)]: [
        "getAllUsers",
        "getUserById",
        "updateUser",
        "deleteUser",
        "getInvoiceById",
        "getInvoices"
    ],

    [getRoleLabel(ERoles.RESTAURANT_MANAGER)]: [
        "createFood",
        "deleteFood",
        "updateFoodQuantity",
        "updateFood",
    ],

    [getRoleLabel(ERoles.CUSTOMER)]: [
        "updateUser",
        "getInvoiceById",
        "getInvoices"
    ],

    [getRoleLabel(ERoles.OWNER)]: [
        "read"
    ]
};
