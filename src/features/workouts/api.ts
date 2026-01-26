import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { workoutSchema, type NewWorkout } from "./validation";
import {
  createWorkout,
  getAllWorkouts,
  deleteWorkout
} from "./services";

const workouts = new Hono();

workouts.get("/", async (c) => {
    const list = await getAllWorkouts();
    return c.json({ success: true, data: list });

});

workouts.post("/", 
  zValidator('json', workoutSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as z.ZodError<NewWorkout>;
      const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid workout payload",
        data: errorTree
     }, 400);
    }
  }), 
  async (c) => {
    const body = c.req.valid("json");
    const workout = await createWorkout(body);
    return c.json({ 
      success: true, 
      message: "Workout created", 
      data: workout 
    }, 201);
  }
);


workouts.delete("/", async (c) => {
    const body = await c.req.json();
    await deleteWorkout(body.id);
    return c.json({ success: true, message: "Workout deleted" }, 200);
});

export default workouts;
