import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { employeeSchema, type NewEmployee } from "./validation";
import {
  createEmployee,
  getAllEmployees,
  deleteEmployee
} from "./services";

const employees = new Hono();

employees.get("/", async (c) => {
    const list = await getAllEmployees();
    return c.json({ success: true, data: list });

});

employees.post("/", 
  zValidator('json', employeeSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as z.ZodError<NewEmployee>;
      const errorTree = z.treeifyError(validationError);
      return c.json({ 
        success: false,
        error: "VALIDATION ERROR",
        message: "Invalid employee payload",
        data: errorTree
     }, 400);
    }
  }), 
  async (c) => {
    const body = c.req.valid("json");
    const employee = await createEmployee(body);
    return c.json({ 
      success: true, 
      message: "Employee created", 
      data: employee 
    }, 201);
  }
);


employees.delete("/", async (c) => {
    const body = await c.req.json();
    await deleteEmployee(body.email);
    return c.json({ success: true, message: "Employee deleted" }, 200);
});

export default employees;
