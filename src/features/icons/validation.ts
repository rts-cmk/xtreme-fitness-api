
import z from "zod";

export const iconSchema = z.object({
  id: z.number().optional(),
  url: z.url("Invalid URL format"),
  altText: z.string().min(1, "Alt text is required").max(200),
  width: z.number().min(1, "Width must be at least 1"),
  height: z.number().min(1, "Height must be at least 1"),
});

export type Icon = z.infer<typeof iconSchema>;
export type NewIcon = Omit<Icon, 'id'>;