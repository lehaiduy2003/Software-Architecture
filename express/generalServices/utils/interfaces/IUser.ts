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
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    RESTAURANT_MANAGER = "RESTAURANT_MANAGER",
    SHIPPER = "SHIPPER",
    OWNER = "OWNER"
}