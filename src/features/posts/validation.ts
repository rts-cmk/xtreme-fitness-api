import { z } from 'zod'
export const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title is required").max(100),
  teaser: z.string().min(2, "Teaser is required").max(255),
  content: z.string().min(2, "Content is required").max(1000),
  author: z.string().min(2, "Author is required").max(50),
  assetId: z.number().min(1),
});
export type Post = z.infer<typeof postSchema>;
export type NewPost = Omit<Post, 'id'>;
