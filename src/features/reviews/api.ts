import { Hono } from "hono";
import { z } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { NewReview, reviewSchema } from "./validation";
import { getAllTestimonials, createTestimonial } from "./services";

const reviews = new Hono();

reviews.get("/", async (c) => {
    const reviewsList = await getAllTestimonials();
    return c.json({ success: true, data: reviewsList });
});

reviews.post("/",
    zValidator("json", reviewSchema, (result, c) => {
        if (!result.success) {
            const validationError = result.error as z.ZodError<NewReview>
            const errorTree = z.treeifyError(validationError)
            return c.json({
                success: false,
                error: "VALIDATION ERROR",
                message: "Invalid testimonial payload",
                data: errorTree
            }, 400);
        }
    }),
    async (c) => {
        const body: NewReview = await c.req.valid("json");
        const result = await createTestimonial(body);
        return c.json({ success: true, data: result }, 201);
    } 
);

export default reviews;