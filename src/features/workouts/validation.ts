import { time } from 'node:console';
import { title } from 'node:process';
import { z } from 'zod'

export const workoutSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  weekday: z.string().min(1, "Weekday is required"),
  time: z.string().min(1, "Time is required"),
  createdAt: z.date().optional(),
});

export type Workout = z.infer<typeof workoutSchema>;
export type NewWorkout = Omit<Workout, 'id' | 'createdAt'>;