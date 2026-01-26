import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { advantageSchema, type NewAdvantage } from "./validation";
import {
  createAdvantage,
  getAllAdvantages,
  deleteAdvantage
} from "./services";

const advantages = new Hono();

advantages.get("/", async (c) => {
    const list = await getAllAdvantages();
    return c.json({ success: true, data: list });

});

advantages.post("/", 
  zValidator('json', advantageSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as z.ZodError<NewAdvantage>;
      const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid advantage payload",
        data: errorTree
     }, 400);
    }
  }), 
  async (c) => {
    const body = c.req.valid("json");
    const advantage = await createAdvantage(body);
    return c.json({ 
      success: true, 
      message: "Advantage created", 
      data: advantage 
    }, 201);
  }
);


advantages.delete("/", async (c) => {
    const body = await c.req.json();
    await deleteAdvantage(body.email);
    return c.json({ success: true, message: "Advantage deleted" }, 200);
});

export default advantages;
