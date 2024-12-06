import { z } from "zod";

const orderSchema = z.object({
  userId: z.string().uuid(), // Adding userId field
  status: z
    .enum(["PENDING", "COOKING", "DELIVERING", "COMPLETED", "CANCELLED", "REFUNDED"])
    .default("PENDING"), // Adding status field
  paymentMethod: z.enum(["CASH", "CARD"]).default("CASH"), // Adding paymentMethod field
  paymentStatus: z.enum(["PENDING", "PAID"]).default("PENDING"), // Adding paymentStatus field
});

export const validateOrder = (data: unknown) => {
  try {
    const parsed = orderSchema.safeParse(data);
    if (!parsed.success) {
      throw parsed.error;
    }
    return parsed.data;
  } catch (error) {
    throw error;
  }
};

export type Order = z.infer<typeof orderSchema>;
