import prisma from "../../../lib/prisma";
import type { NewMembership } from "./validation";

export async function createMembership(data: NewMembership) {
    return prisma.membership.create({ data } );
  }

  export async function updateMembership(id: number, data: NewMembership) {
    return prisma.membership.update({ where: { id }, data } );
  }
  
  export async function getAllMemberships() {
  return prisma.membership.findMany({
    include: {
      asset: { omit: { id: true, createdAt: true} },
      advantages: { omit: { id: true, createdAt: true, membershipId: true}, },
    },
    omit: { assetId: true },
  });
  }

  export async function deleteMembership(id: number) {
    return prisma.membership.delete({ where: { id } });
  }
