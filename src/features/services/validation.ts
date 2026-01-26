import { z } from 'zod'
export const serviceSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title is required").max(100),
  teaser: z.string().min(2, "Teaser is required").max(255),
  content: z.string().min(2, "Content is required").max(1000),
  iconId: z.number().min(1),
  assetId: z.number().min(1),
});
export type Service = z.infer<typeof serviceSchema>;
export type NewService = Omit<Service, 'id'>;