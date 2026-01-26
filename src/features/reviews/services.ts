// src/services/messages.service.ts
import prisma, { Prisma } from "../../../lib/prisma";

  export async function createTestimonial (data: Prisma.TestimonialCreateInput) {
    return await prisma.testimonial.create({ data });
  }

  export async function getAllTestimonials () {
    return await prisma.testimonial.findMany({
        include: { asset: { omit: { id: true} } },
        omit: { assetId: true }
    });
  }


