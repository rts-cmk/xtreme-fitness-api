
import { Hono } from "hono";
import { z } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { iconSchema, type NewIcon } from "./validation";
import { createIcon, getAllIcons } from "./services";

const icons = new Hono();


icons.get("/", async (c) => {
    const iconsList = await getAllIcons();
    return c.json({
        success: true, 
        data: iconsList
    });
});

icons.post("/",
    zValidator("json", iconSchema, (result, c) => {
    if (!result.success) {
        const validationError = result.error as z.ZodError<NewIcon>;
        const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION_ERROR",
        message: "Invalid icon payload",
        data: errorTree
     }, 400);
    }
  }),
    
    async (c) => {
        const body = await c.req.valid("json");
        const result = await createIcon(body);
        return c.json({ success: true, message: "Icon created successfully", data: result }, 201);    
    }
);

export default icons;