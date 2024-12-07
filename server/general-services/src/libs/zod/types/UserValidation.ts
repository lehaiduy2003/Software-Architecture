import { z } from "zod";

const userSchema = z.object({
    fullName: z.string().min(3).max(255),
    gender: z.boolean().optional(),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    address: z.string().min(3).max(255).optional(),
    dob: z.date().optional(),
});

export const validateUser = (data: unknown) => {
    try {
      const parsed = userSchema.safeParse(data);
      if (!parsed.success) {
        throw parsed.error;
      }
      return parsed.data;
    } catch (error) {
      throw error;
    }
};

export type User = z.infer<typeof userSchema>;
  