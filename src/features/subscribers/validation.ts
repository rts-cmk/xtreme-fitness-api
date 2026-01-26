import { z } from 'zod'

export const subscriberSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  createdAt: z.date().optional(),
});

export type Subscriber = z.infer<typeof subscriberSchema>;
export type NewSubscriber = Omit<Subscriber, 'id' | 'createdAt'>;