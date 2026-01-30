import { Hono } from "hono";
import { jwt, type JwtVariables } from 'hono/jwt'
import { enrollUserInWorkout, getUserById, unenrollUserFromWorkout, updateUser } from "./services";

type Variables = JwtVariables

const users = new Hono();

users.use("/*", jwt({
    secret: process.env.JWT_SECRET as string,
    alg: 'HS256'
}));  
// Protect all routes under /users
// passes "jwtPayload" to context

users.get("/me", async (c) => {
    const payload = c.get("jwtPayload");
    if (!payload) {
        return c.json({ success: false, message: "Unauthorized" }, 401);
    }
    const user = await getUserById(payload.id);
    if (user) {
        return c.json({ success: true, data: user });
    } else {
        return c.json({ success: false, message: "User not found" }, 404);
    }
});

users.patch("/me", async (c) => {
    const payload = c.get("jwtPayload");
    if (!payload) {
        return c.json({ success: false, message: "Unauthorized" }, 401);
    }
    const body = await c.req.json();
    const user = await updateUser(payload.id, body);
    return c.json({ success: true, data: user });
});

users.post("/me/enroll", async (c) => {
    const payload = c.get("jwtPayload");
    if (!payload) {
        return c.json({ success: false, message: "Unauthorized" }, 401);
    }
    const body = await c.req.json();
    const enrolledWorkout = await enrollUserInWorkout(payload.id, body.workoutId);
    return c.json({ success: true, data: enrolledWorkout });
});
  
users.delete("/me/enroll", async (c) => {
    const payload = c.get("jwtPayload"); 
    if (!payload) {
        return c.json({ success: false, message: "Unauthorized" }, 401);
    }
    const body = await c.req.json();
    console.log(body);
    const unenrolledWorkout = await unenrollUserFromWorkout(payload.id, body.workoutId);
    return c.json({ success: true, data: unenrolledWorkout });
});

export default users;