import prisma from "../../../lib/prisma";
import type { NewBenefit } from "./validation";

export async function createBenefit(data: NewBenefit) {
    return prisma.benefit.create({ data });
  }
  
  export async function getAllBenefits() {
  return prisma.benefit.findMany({
    include: {
      asset: true,
    },
    omit: { assetId: true },
  });
  }

  export async function deleteBenefit(id: number) {
    return prisma.benefit.delete({ where: { id } });
  }
