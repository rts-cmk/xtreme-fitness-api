import { z } from 'zod'
import { id } from 'zod/v4/locales';

export const reviewSchema = z.object({
  id: z.number().optional(),
  author: z.string().min(1, "Author is required"),
  content: z.string().min(1, "Content is required"),
  position: z.string().min(1, "Position is required"),
  assetId: z.number().optional(),
});

export type Review = z.infer<typeof reviewSchema>;
export type NewReview = Omit<Review, 'id'>;