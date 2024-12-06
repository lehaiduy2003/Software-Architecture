import { z } from "zod";

const orderedFoodSchema = z.object({
  id: z.string().uuid(),
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
