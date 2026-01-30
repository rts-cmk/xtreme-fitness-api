import prisma, { Prisma } from "../../../lib/prisma";
import { NewComment } from "../posts/validation";

  export async function getAllComments() {
    return await prisma.comment.findMany();
  }

  export async function updateComment (id: number, body: NewComment) {
    const comment = await prisma.comment.update({
      where: { id },
      data: body
    });
    return comment;
  }

  export async function deleteComment (id: number) {
    await prisma.comment.delete({
      where: { id }
    });
  }