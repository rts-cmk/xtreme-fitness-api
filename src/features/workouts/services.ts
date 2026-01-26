import prisma from "../../../lib/prisma";
import { NewWorkout } from "./validation";

export async function createWorkout(data: NewWorkout) {
    return prisma.workout.create({ data });
  }
  
  export async function getAllWorkouts() {
  return prisma.workout.findMany();
  }

  export async function deleteWorkout(id: number) {
    return prisma.workout.delete({ where: { id } });
  }
