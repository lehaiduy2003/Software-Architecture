import prisma from "../../configs/prisma";

export default class FoodService {
    public getAllFood = async () => {
        const f = await prisma.foods.findMany();
        return f;
    }

    public getFoodById = async (id: number) => {
        const f = await prisma.foods.findUnique({
            where: {
                id: id
            }
        });
        return f;
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
    }
}