
import { Hono } from "hono";
import { z, ZodError, treeifyError, success } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { commentSchema, NewComment, postSchema, type NewPost } from "./validation";
import { getAllPosts, getPostById, createPost,  updatePost, deletePost, addCommentToPost } from "./services";
import { jwt } from 'hono/jwt'

const posts = new Hono();

posts.get("/", async (c) => {
    let posts = await getAllPosts();
    return c.json({ success: true, data: posts });
});


posts.get("/:id", async (c) => {
        const id = c.req.param("id");
        let post = await getPostById(Number(id));
        return c.json({ success: true, data: post });
});

posts.post("/", 
    zValidator("json", postSchema, (result, c) => {
    if (!result.success) {
          const validationError = result.error as ZodError<NewPost>
          const errorTree = treeifyError(validationError)
          return c.json({ 
            success: false,
            error: "VALIDATION ERROR",
            message: "Invalidt blogpost payload",
            data: errorTree
           }, 400);
        }
  }), 
    async (c) => {
        const body: NewPost = await c.req.valid("json");
        const post = await createPost(body);
        return c.json({
          success: true, 
          message: "Post created", 
          data: post 
        }, 201 );
    
    }
);



posts.put("/:id", zValidator("json", postSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as ZodError<NewPost>
      const errorTree = treeifyError(validationError)
      return c.json({ 
        success: false, 
        error: "VALIDATION ERROR", 
        message: "Invalid blogpost payload", 
        data: errorTree 
      }, 400);
    }
  }), async (c) => {
        const id = c.req.param("id");
        const body = await c.req.valid("json");
        let post = await updatePost(Number(id), body);
        return c.json({
          success: true,
          message: "Post updated",
          data: post
        }, 200);
    }
);

posts.delete("/:id", async (c) => {
        const id = c.req.param("id");
        await deletePost(Number(id));
        return c.json({ success: true, message: "Post deleted" }, 200);
 
});



posts.post("/:postId/comments", 
  jwt({ secret: process.env.JWT_SECRET as string,
      alg: 'HS256'
   }),

  zValidator("json", commentSchema, (result, c) => {
    if (!result.success) {
          const validationError = result.error as ZodError<NewComment>
          const errorTree = treeifyError(validationError)
          return c.json({ 
            success: false,
            error: "VALIDATION ERROR",
            message: "Invalidt comment payload",
            data: errorTree
           }, 400);
        }
  }), 
    async (c) => {
    const payload = c.get("jwtPayload");
    if (!payload) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const userId = Number(payload.id);
    const postId = Number(c.req.param("postId"));
    const body: NewComment = await c.req.valid("json");
    const comment = await addCommentToPost(postId, userId, body);
    return c.json({
      success: true,
      message: "Comment added to blogpost",
      data: comment
    }, 201);
});

export default posts;