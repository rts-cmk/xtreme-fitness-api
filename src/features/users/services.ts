import prisma from "../../../lib/prisma"; 
import { hashSync } from "bcryptjs";
import type { NewUser } from "./validation";

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({ 
    where: { id }, 
    include: { 
      enrolledWorkouts: true, 
      membership: {
        omit: { id: true, assetId: true, createdAt: true },
        include: { asset: {omit: {id: true, createdAt: true} } }
      } 
  },
    omit: { membershipId : true }
  });
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUser(id: number, data: NewUser ) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      membershipId: data.membershipId,
      role: data.role,
      password: data.newPassword ? hashSync(data.newPassword, 15) : undefined,
    },
  });
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
