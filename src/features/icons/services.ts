import prisma, { Prisma } from "../../../lib/prisma";
import type { NewIcon } from "./validation";

export async function getAllIcons () {
    return await prisma.icon.findMany();
  }

export async function createIcon (data: NewIcon) {
    const iconData: Prisma.IconCreateInput = {
        url: data.url,
        altText: data.altText,
        width: data.width,
        height: data.height
    };
    const newIcon = await prisma.icon.create({ data: iconData });
    return newIcon;
}