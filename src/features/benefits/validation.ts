import { title } from 'node:process';
import { z } from 'zod'

export const benefitSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  assetId: z.number().optional(),
  createdAt: z.date().optional(),
});

export type Benefit = z.infer<typeof benefitSchema>;
export type NewBenefit = Omit<Benefit, 'id' | 'createdAt'>;