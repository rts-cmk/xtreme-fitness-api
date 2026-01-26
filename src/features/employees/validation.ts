import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  area: z.string().min(2, "Area must be at least 2 characters long"),
  assetId: z.number().optional(),
  createdAt: z.date().optional(),
});

export type Employee = z.infer<typeof employeeSchema>;
export type NewEmployee = Omit<Employee, 'id' | 'createdAt'>;