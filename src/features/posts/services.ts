import prisma, { Prisma } from "../../../lib/prisma";
import type { NewPost } from "./validation";

export async function createPost (data: NewPost) {
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
    return prisma.post.create({ data: prismaData });
  }

  export async function getAllPosts() {
    return prisma.post.findMany();
  }

  export async function getPostById(id: number) {
    return prisma.post.findUnique({ 
      where: { id },
    });
  }

  export async function updatePost(id: number, data: NewPost) {
    const prismaData: Prisma.PostUpdateInput = {
      title: data.title,
      content: data.content,
      asset: {
        connect: {
          id: data.assetId
        }
      }
    };
    return prisma.post.update({ where: { id }, data: prismaData });
  }

  export async function deletePost(id: number) {
    return prisma.post.delete({ where: { id } });
  }
