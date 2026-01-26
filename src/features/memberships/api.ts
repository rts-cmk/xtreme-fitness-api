import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { membershipSchema, type NewMembership } from "./validation";
import {
  createMembership,
  getAllMemberships,
  deleteMembership,
  updateMembership
} from "./services";

const memberships = new Hono();

memberships.get("/", async (c) => {
    const list = await getAllMemberships();
    return c.json({ success: true, data: list });

});

memberships.post("/", 
  zValidator('json', membershipSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as z.ZodError<NewMembership>;
      const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid membership payload",
        data: errorTree
     }, 400);
    }
  }), 
  async (c) => {
    const body = c.req.valid("json");
    const membership = await createMembership(body);
    return c.json({ 
      success: true, 
      message: "Membership created", 
      data: membership 
    }, 201);
  }
);

memberships.put("/:id", 
  zValidator('json', membershipSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as z.ZodError<NewMembership>;
      const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid membership payload",
        data: errorTree
     }, 400);
    }   
  }),
  async (c) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.valid("json");
    const updatedMembership = await updateMembership(id, body);
    return c.json({ 
      success: true, 
      message: "Membership updated", 
      data: updatedMembership 
    }, 200);
  }
);



memberships.delete("/", async (c) => {
    const body = await c.req.json();
    await deleteMembership(body.id);
    return c.json({ success: true, message: "Membership deleted" }, 200);
});

export default memberships;
