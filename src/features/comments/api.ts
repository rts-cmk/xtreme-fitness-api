import { Hono } from "hono";
import { z } from "zod"; // <-- needed to detect ZodError
import { jwt } from 'hono/jwt'
import { zValidator } from "@hono/zod-validator";
import { deleteComment, getAllComments, updateComment } from "./services";
import { commentSchema, NewComment } from "../posts/validation";

const comments = new Hono();

comments.get("/", async (c) => {
    
    const comments = await getAllComments();
    if (comments) {
        return c.json({
            success: true,
            data: comments
        });
    } else {
        return c.json({ message: "No comments found" }, 404);
    }
});

comments.put("/:id", 
    jwt({ secret: process.env.JWT_SECRET as string,
        alg: 'HS256'
     }),
    
    zValidator("json", commentSchema, (result, c) => {
        if (!result.success) {
            const validationError = result.error as z.ZodError<NewComment>
            const errorTree = z.treeifyError(validationError)
            return c.json({ 
                success: false, 
                error: "VALIDATION ERROR", 
                message: "Invalid comment payload", 
                data: errorTree 
            }, 400);
        }
    }),

    async (c) => {
        const payload = c.get("jwtPayload");
        if (!payload) {
        return c.json({ message: "Unauthorized" }, 401);
        }
        const id = Number(c.req.param("id"));
        const body: NewComment = await c.req.valid("json");
        let updatedComment = await updateComment(id, body);
        return c.json({ 
            success: true, 
            message: `Comment with id ${id} updated`,
            data: updatedComment
        }, 200);
    }
);

comments.delete("/:id", 
    jwt({ secret: process.env.JWT_SECRET as string,
        alg: 'HS256'
     }),
    async (c) => {
        const payload = c.get("jwtPayload");
        if (!payload) {
        return c.json({ message: "Unauthorized" }, 401);
        }
        const id = Number(c.req.param("id"));
        deleteComment(id);
        return c.json({ success: true, message: `Comment with id ${id} deleted` });
    }
);

export default comments;