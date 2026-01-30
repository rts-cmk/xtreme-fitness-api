import prisma, { Prisma } from "../../../lib/prisma";
import type { NewComment, NewPost } from "./validation";

export async function createPost (data: NewPost) {
    const prismaData = {
      title: data.title,
      teaser: data.teaser,
      content: data.content,
      author: data.author,
      asset: {
        connect: {
          id: data.assetId
        }
      }
    };
    return prisma.post.create({ data: prismaData });
  }

  export async function getAllPosts() {
    return prisma.post.findMany({
    include: {
      asset: {omit: { id: true, createdAt: true} },
    },
    omit: { assetId: true }
    });
  }

  export async function getPostById(id: number) {
    return prisma.post.findUnique({ 
      where: { id },
      omit: { assetId: true },
      include: { 
        asset: {omit: { id: true, createdAt: true} }, 
        comments: {omit: { postId: true, userId: true } }
      }
    });
  }

  export async function updatePost(id: number, data: NewPost) {
    const prismaData: Prisma.PostUpdateInput = {
      title: data.title,
      teaser: data.teaser,
      content: data.content,
      author: data.author,
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


  export async function addCommentToPost(postId: number, userId: number, commentData: NewComment) {
    return prisma.comment.create({
      data: {
        ...commentData,
        post: {
          connect: {
            id: postId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }