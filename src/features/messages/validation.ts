import { z } from 'zod'
import { id } from 'zod/v4/locales';

export const messageSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type Message = z.infer<typeof messageSchema>;
export type NewMessage = Omit<Message, 'id'>;