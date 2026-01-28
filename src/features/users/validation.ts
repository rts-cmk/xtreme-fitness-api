import { z } from "zod";

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2),
    email: z.string().email(),
    role: z.enum(['member', 'admin']).optional(),
    membershipId: z.number().optional(),
    password: z.string().min(6),
    newPassword: z.string().min(6).optional(),
});

export type User = z.infer<typeof userSchema>;
export type NewUser = Omit<User, 'id'>;
export type LoginUser = Pick<User, 'email' | 'password'>;


