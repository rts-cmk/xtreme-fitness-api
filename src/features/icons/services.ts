import prisma, { Prisma } from "../../../lib/prisma";
import type { NewIcon } from "./validation";

export async function getAllIcons () {
    return await prisma.image.findMany();
  }

export async function createIcon (data: NewIcon) {
    const iconData: Prisma.ImageCreateInput = {
        url: data.url,
        altText: data.altText,
        width: data.width,
        height: data.height
    };
    const newIcon = await prisma.image.create({ data: iconData });
    return newIcon;
}