import prisma from "../../../lib/prisma";
import type { NewBenefit } from "./validation";

export async function createBenefit(data: NewBenefit) {
    return prisma.benefit.create({ 
      data: {
        title: data.title,
        content: data.content,
        asset: {
          connect: { 
            id: data.assetId 
          }
        },
      },
      
    });
  }
  
  export async function getAllBenefits() {
  return prisma.benefit.findMany({
    include: {
      asset: {omit: { id: true, createdAt: true} },
    },
    omit: { assetId: true },
  });
  }

  export async function deleteBenefit(id: number) {
    return prisma.benefit.delete({ where: { id } });
  }
