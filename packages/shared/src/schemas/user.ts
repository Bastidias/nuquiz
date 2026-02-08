import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  avatarUrl: z.string().url().nullable(),
  provider: z.enum(["google", "github", "apple"]),
  providerId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.string().datetime(),
});

export type Session = z.infer<typeof sessionSchema>;

export const publicUserSchema = userSchema.pick({
  id: true,
  name: true,
  avatarUrl: true,
});

export type PublicUser = z.infer<typeof publicUserSchema>;
