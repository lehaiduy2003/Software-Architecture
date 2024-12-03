import { log } from "console";
import prisma from "../../configs/prisma";

export default class FoodService {
    public getAllFood = async () => {
        const f = await prisma.foods.findMany();
        return f;
    }

    public getFoodById = async (id: number) => {
        const f = await prisma.foods.findUnique({
            where: {
                id: Number(id)
            }
        });
        return f;
    }

    public getAllRestaurants = async () => {
        const data = await prisma.restaurants.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        log(data);
        return data;
    }

    public getMenuByRestaurantId = async (restaurantId: number) => {
        return await prisma.categories.findMany({
            where: {
                foods: {
                    some: {
                        restaurantId: restaurantId,
                    },
                },
            },
            select: {
                name: true,
                foods: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
                        FoodImages: {
                            select: {
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });
    }

    public createFood = async (data: any) => {
        const f = await prisma.foods.create({
            data: data
        });
        return f;
    }

    public updateFood = async (id: number, data: any) => {
        const f = await prisma.foods.update({
            where: {
                id: id
            },
            data: data
        });
        return f;
    }

    public deleteFood = async (id: number) => {
        const f = await prisma.foods.delete({
            where: {
                id: id
            }
        });
        return f;
    };
}