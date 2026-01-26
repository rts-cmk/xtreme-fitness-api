
import { Hono } from "hono";
import { z, ZodError, treeifyError, success } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { exerciseSchema, type NewExercise } from "./validation";
import { getAllExercises, getExerciseById, createExercise,  updateExercise, deleteExercise } from "./services";
import { jwt } from 'hono/jwt'

const exercises = new Hono();

exercises.get("/", async (c) => {
    let exercises = await getAllExercises();
    return c.json({ success: true, data: exercises });
});


exercises.get("/:id", async (c) => {
        const id = c.req.param("id");
        let exercise = await getExerciseById(Number(id));
        return c.json({ success: true, data: exercise });
});

exercises.post("/", 
    zValidator("json", exerciseSchema, (result, c) => {
    if (!result.success) {
          const validationError = result.error as ZodError<NewExercise>
          const errorTree = treeifyError(validationError)
          return c.json({ 
            success: false,
            error: "VALIDATION ERROR",
            message: "Invalidt blogexercise payload",
            data: errorTree
           }, 400);
        }
  }), 
    async (c) => {
        const body: NewExercise = await c.req.valid("json");
        const exercise = await createExercise(body);
        return c.json({
          success: true, 
          message: "Exercise created", 
          data: exercise 
        }, 201 );
    
    }
);



exercises.put("/:id", zValidator("json", exerciseSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as ZodError<NewExercise>
      const errorTree = treeifyError(validationError)
      return c.json({ 
        success: false, 
        error: "VALIDATION ERROR", 
        message: "Invalid blogexercise payload", 
        data: errorTree 
      }, 400);
    }
  }), async (c) => {
        const id = c.req.param("id");
        const body = await c.req.valid("json");
        let exercise = await updateExercise(Number(id), body);
        return c.json({
          success: true,
          message: "Exercise updated",
          data: exercise
        }, 200);
    }
);

exercises.delete("/:id", async (c) => {
        const id = c.req.param("id");
        await deleteExercise(Number(id));
        return c.json({ success: true, message: "Exercise deleted" }, 200);
 
});

export default exercises;