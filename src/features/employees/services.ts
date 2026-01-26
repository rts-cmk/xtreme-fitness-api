import prisma from "../../../lib/prisma";
import { NewEmployee } from "./validation";

export async function createEmployee(data: NewEmployee) {
    return prisma.employee.create({ data });
  }
  
  export async function getAllEmployees() {
  return prisma.employee.findMany();
  }

  export async function deleteEmployee(id: number) {
    return prisma.employee.delete({ where: { id } });
  }
