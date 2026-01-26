
import z from "zod";

export const assetSchema = z.object({
  id: z.number().optional(),
  url: z.url("Invalid URL format"),
  altText: z.string().min(1, "Alt text is required").max(200),
  width: z.number().min(1, "Width must be at least 1"),
  height: z.number().min(1, "Height must be at least 1"),
});

export type Asset = z.infer<typeof assetSchema>;
export type NewAsset = Omit<Asset, 'id'>;