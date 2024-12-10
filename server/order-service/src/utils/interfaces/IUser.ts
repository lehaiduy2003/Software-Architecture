export interface IUser {
    id: number;
    name: string;
    gender: boolean;
    email: string;
    password: string;
    phone: string;
    address: string;
    dob: Date;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRole {
    id: number;
    name: string;
    users?: IUser[]; // Relation to Users
}

export enum ERoles {
    ADMIN = 1,
    CUSTOMER = 2,
    RESTAURANT_MANAGER = 3,
    OWNER = 4
}

export function getRoleLabel(role: ERoles): string {
    switch (role) {
        case ERoles.ADMIN:
            return 'ADMIN';
        case ERoles.CUSTOMER:
            return 'CUSTOMER';
        case ERoles.RESTAURANT_MANAGER:
            return 'RESTAURANT_MANAGER';
        case ERoles.OWNER:
            return 'OWNER';
        default:
            return 'Unknown Role';
    }
}