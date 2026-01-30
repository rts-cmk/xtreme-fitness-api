import { z } from 'zod'
export const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title is required"),
  teaser: z.string().min(2, "Teaser is required"),
  content: z.string().min(2, "Content is required"),
  author: z.string().min(2, "Author is required"),
  assetId: z.number().min(1),
});
export type Post = z.infer<typeof postSchema>;
export type NewPost = Omit<Post, 'id'>;



export const commentSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email format"),
  content: z.string().min(1, "Content is required").max(500),
  postId: z.number().optional(),
  userId: z.number().optional(),
});
export type Comment = z.infer<typeof commentSchema>;
export type NewComment = Omit<Comment, 'id' | 'postId' | 'userId'>;
  