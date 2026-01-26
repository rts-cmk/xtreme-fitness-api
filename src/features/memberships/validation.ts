import { title } from 'node:process';
import { optional, z } from 'zod'

export const membershipSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  price: z.number().min(0, "Price must be non-negative"),
  assetId: z.number(),
  createdAt: z.date().optional(),
});

export type Membership = z.infer<typeof membershipSchema>;
export type NewMembership = Omit<Membership, 'id' | 'createdAt'>;