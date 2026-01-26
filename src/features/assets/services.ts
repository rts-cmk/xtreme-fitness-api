import prisma, { Prisma } from "../../../lib/prisma";
import type { NewAsset } from "./validation";

export async function getAllAssets () {
    return await prisma.image.findMany();
  }

export async function createAsset (data: NewAsset) {
    const assetData: Prisma.ImageCreateInput = {
        url: data.url,
        altText: data.altText,
        width: data.width,
        height: data.height
    };
    const newAsset = await prisma.image.create({ data: assetData });
    return newAsset;
}