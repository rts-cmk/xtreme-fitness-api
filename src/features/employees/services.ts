import prisma from "../../../lib/prisma";
import { NewEmployee } from "./validation";

export async function createEmployee(data: NewEmployee) {
  return prisma.employee.create({
    data: {
      name: data.name,
      area: data.area,
      asset: {
        connect: {
          id: data.assetId,
        },
      },
    },
  });
}

export async function getAllEmployees() {
  return prisma.employee.findMany({
    include: {
      asset: { omit: { id: true, createdAt: true } },
    },
    omit: { assetId: true },
  });
}

export async function deleteEmployee(id: number) {
  return prisma.employee.delete({ where: { id } });
}
