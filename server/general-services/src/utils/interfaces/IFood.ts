import { IRestaurant } from "./IRestaurant";

export interface ICategory {
    id: number;
    name: string;
}

export interface IFoodImage {
    id: number;
    foodId: number; // FK
    imageUrl: string;
    foods?: IFood; // Relation to Foods
}

export interface IFood {
    id: number;
    name: string;
    categoryId: number; // FK
    price: number;
    description?: string | null;
    restaurantId: number; // FK
    categories?: ICategory; // Relation to Categories
    restaurants?: IRestaurant; // Relation to Restaurants
    foodImages?: IFoodImage[]; // Relation to FoodImages
}