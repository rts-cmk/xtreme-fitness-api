import prisma, { Prisma } from "../../../lib/prisma";
import type { NewExercise } from "./validation";

export async function createExercise (data: NewExercise) {
    const prismaData = {
      title: data.title,
      teaser: data.teaser,
      content: data.content,
      asset: {
        connect: {
          id: data.assetId
        }
      }
    };
    return prisma.excercise.create({ data: prismaData });
  }

  export async function getAllExercises() {
    return prisma.excercise.findMany();
  }

  export async function getExerciseById(id: number) {
    return prisma.excercise.findUnique({ 
      where: { id },
    });
  }

  export async function updateExercise(id: number, data: NewExercise) {
    const prismaData = {
      title: data.title,
      content: data.content,
      asset: {
        connect: {
          id: data.assetId
        }
      }
    };
    return prisma.excercise.update({ where: { id }, data: prismaData });
  }

  export async function deleteExercise(id: number) {
    return prisma.excercise.delete({ where: { id } });
  }
