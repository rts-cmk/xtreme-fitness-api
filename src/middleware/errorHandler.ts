// src/middleware/errorHandler.ts
import { Context, Next } from "hono";

export const errorHandler = async (c: Context, next: Next) => {
  try {
    return await next();
  } catch (err) {
    console.error(err); // Log server-side for debugging
    return c.json(
      { success: false, message: "Internal server error" },
      500
    );
  }
};
