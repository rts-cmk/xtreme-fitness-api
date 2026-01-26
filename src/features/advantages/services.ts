import prisma from "../../../lib/prisma";
import { NewAdvantage } from "./validation";

export async function createAdvantage(data: NewAdvantage) {
    return prisma.advantage.create({ data });
  }
  
  export async function getAllAdvantages() {
  return prisma.advantage.findMany();
  }

  export async function deleteAdvantage(id: number) {
    return prisma.advantage.delete({ where: { id } });
  }
