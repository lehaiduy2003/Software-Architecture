import { z } from "zod";

const orderedFoodSchema = z.object({
  id: z.string().uuid(),
  price: z.number().positive(),
  quantity: z.number().int().min(1), // Adding quantity field
});

export const validateOrderedFood = (data: unknown) => {
  try {
    const parsed = orderedFoodSchema.safeParse(data);
    if (!parsed.success) {
      throw parsed.error;
    }
    return parsed.data;
  } catch (error) {
    throw error;
  }
};

export type OrderedFood = z.infer<typeof orderedFoodSchema>;
