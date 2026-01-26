import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { subscriberSchema, type NewSubscriber } from "./validation";
import {
  createSubscriber,
  getAllSubscribers,
  deleteSubscriber
} from "./services";

const subscribers = new Hono();

subscribers.get("/", async (c) => {
    const list = await getAllSubscribers();
    return c.json({ success: true, data: list });

});

subscribers.post("/", 
  zValidator('json', subscriberSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as z.ZodError<NewSubscriber>;
      const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid subscriber payload",
        data: errorTree
     }, 400);
    }
  }), 
  async (c) => {
    const body = c.req.valid("json");
    const subscriber = await createSubscriber(body.email);
    return c.json({ 
      success: true, 
      message: "Subscriber created", 
      data: subscriber 
    }, 201);
  }
);


subscribers.delete("/", async (c) => {
    const body = await c.req.json();
    await deleteSubscriber(body.email);
    return c.json({ success: true, message: "Subscriber deleted" }, 200);
});

export default subscribers;
