import { Hono } from "hono";
import { z } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { messageSchema, type NewMessage } from "./validation";
import { getAllMessages, createMessage } from "./services";

const messages = new Hono();

messages.post("/",
    zValidator("json", messageSchema, (result, c) => {
        if (!result.success) {
            const validationError = result.error as z.ZodError<NewMessage>;
            const errorTree = z.treeifyError(validationError);
          return c.json({ 
            success: false,
            error: "VALIDATION ERROR",
            message: "Invalid message payload",
            data: errorTree
         }, 400);
        }
    }),
    async (c) => {
        const body: NewMessage = await c.req.valid("json");
        const result = await createMessage(body);
        return c.json({ success: true,
            message: "Message created",
            data: result }, 201);
    } 
);

messages.get("/", async (c) => {
        const messagesList = await getAllMessages();
        return c.json({ success: true, data: messagesList });
});

export default messages;