import { z } from 'zod'

export const advantageSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, "Description is required"),
  membershipId: z.number(),
  createdAt: z.date().optional(),
});

export type Advantage = z.infer<typeof advantageSchema>;
export type NewAdvantage = Omit<Advantage, 'id' | 'createdAt'>;