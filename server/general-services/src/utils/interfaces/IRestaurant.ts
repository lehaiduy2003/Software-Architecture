import { IFood } from "./IFood";

export interface IRestaurant {
    id: number;
    name: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number; 
    foods?: IFood[]; // Relation to Foods
  }