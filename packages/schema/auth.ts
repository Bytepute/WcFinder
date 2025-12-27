import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(2).max(20),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});
export type LoginSchema = z.infer<typeof loginSchema>;
