
import { Hono } from "hono";
import { z } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { assetSchema, type NewAsset } from "./validation";
import { createAsset, getAllAssets } from "./services";

const assets = new Hono();


assets.get("/", async (c) => {
    const assetsList = await getAllAssets();
    return c.json({
        success: true, 
        data: assetsList
    });
});

assets.post("/",
    zValidator("json", assetSchema, (result, c) => {
    if (!result.success) {
        const validationError = result.error as z.ZodError<NewAsset>;
        const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION_ERROR",
        message: "Invalid asset payload",
        data: errorTree
     }, 400);
    }
  }),
    
    async (c) => {
        const body = await c.req.valid("json");
        const result = await createAsset(body);
        return c.json({ success: true, message: "Asset created successfully", data: result }, 201);    
    }
);

export default assets;