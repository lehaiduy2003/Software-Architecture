import { z } from "zod";


const foodSchema = z.object({
    name: z.string().min(3).max(255),
    categoryId: z.number().int().min(1),
    price: z.number(),
    description: z.string().min(3).max(255).nullable(),
    restaurantId: z.string().min(3).max(255),
    imageUrl: z.string().url(),
    quantity: z.number().int().min(0),
});

export const validateFood = (data: unknown) => {
    try {
        const parsed = foodSchema.safeParse(data);
        if (!parsed.success) {
            throw parsed.error;
        }
        return parsed.data;
    } catch (error) {
        throw error;
    }
};

export type Food = z.infer<typeof foodSchema>;
