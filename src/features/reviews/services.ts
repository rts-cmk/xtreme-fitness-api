// src/services/messages.service.ts
import prisma, { Prisma } from "../../../lib/prisma";

  export async function createReview (data: Prisma.ReviewCreateInput) {
    return await prisma.review.create({ data });
  }

  export async function getAllReviews () {
    return await prisma.review.findMany();
  }


