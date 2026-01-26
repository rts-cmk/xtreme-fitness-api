import prisma, { Prisma } from "../../../lib/prisma";
import type { NewService } from "./validation";

export async function createService (data: NewService) {
    const prismaData = {
      title: data.title,
      teaser: data.teaser,
      content: data.content,
      asset: {
        connect: {
          id: data.assetId
        }
      },
      icon: {
        connect: {
          id: data.iconId
        }
      }
    };
    return prisma.service.create({ data: prismaData });
  }

  export async function getAllServices() {
    return prisma.service.findMany({
    include: {
      asset: {omit: { id: true, createdAt: true} },
      icon: {omit: { id: true, createdAt: true} },
    },
    omit: { assetId: true, iconId: true },
  });
  }

  export async function getServiceById(id: number) {
    return prisma.excercise.findUnique({ 
      where: { id },
    });
  }

  export async function updateService(id: number, data: NewService) {
    const prismaData = {
      title: data.title,
      teaser: data.teaser,
      content: data.content,
      asset: {
        connect: {
          id: data.assetId
        }
      },
      icon: {
        connect: {
          id: data.iconId
        }
      }
    };
    return prisma.service.update({ where: { id }, data: prismaData });
  }

  export async function deleteService(id: number) {
    return prisma.service.delete({ where: { id } });
  }
