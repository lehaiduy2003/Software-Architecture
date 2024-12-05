import { z } from "zod";

const invoiceSchema = z.object({
  orderId: z.string().uuid(), // Adding orderId field
  total: z.number().positive(), // Adding total field
});

export const validateInvoice = (data: unknown) => {
  try {
    const parsed = invoiceSchema.safeParse(data);
    if (!parsed.success) {
      throw parsed.error;
    }
    return parsed.data;
  } catch (error) {
    throw error;
  }
};

export type Invoice = z.infer<typeof invoiceSchema>;
