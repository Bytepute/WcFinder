import { z } from "zod";
//PLACEHOLDER
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Auto-generate the TypeScript type from the schema
export type LoginSchema = z.infer<typeof loginSchema>;
