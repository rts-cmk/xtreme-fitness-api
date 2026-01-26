import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { benefitSchema, type NewBenefit } from "./validation";
import {
  createBenefit,
  getAllBenefits,
  deleteBenefit
} from "./services";

const benefits = new Hono();

benefits.get("/", async (c) => {
    const list = await getAllBenefits();
    return c.json({ success: true, data: list });

});

benefits.post("/", 
  zValidator('json', benefitSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as z.ZodError<NewBenefit>;
      const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid benefit payload",
        data: errorTree
     }, 400);
    }
  }), 
  async (c) => {
    const body = c.req.valid("json");
    const benefit = await createBenefit(body);
    return c.json({ 
      success: true, 
      message: "Benefit created", 
      data: benefit 
    }, 201);
  }
);


benefits.delete("/", async (c) => {
    const body = await c.req.json();
    await deleteBenefit(body.id);
    return c.json({ success: true, message: "Benefit deleted" }, 200);
});

export default benefits;
