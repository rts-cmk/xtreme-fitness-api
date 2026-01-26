
import { Hono } from "hono";
import { z, ZodError, treeifyError, success } from "zod"; // <-- needed to detect ZodError
import { zValidator } from "@hono/zod-validator";
import { serviceSchema, type NewService } from "./validation";
import { getAllServices, getServiceById, createService,  updateService, deleteService } from "./services";
import { jwt } from 'hono/jwt'

const services = new Hono();

services.get("/", async (c) => {
    let services = await getAllServices();
    return c.json({ success: true, data: services });
});


services.get("/:id", async (c) => {
        const id = c.req.param("id");
        let service = await getServiceById(Number(id));
        return c.json({ success: true, data: service });
});

services.post("/", 
    zValidator("json", serviceSchema, (result, c) => {
    if (!result.success) {
          const validationError = result.error as ZodError<NewService>
          const errorTree = treeifyError(validationError)
          return c.json({ 
            success: false,
            error: "VALIDATION ERROR",
            message: "Invalidt blogservice payload",
            data: errorTree
           }, 400);
        }
  }), 
    async (c) => {
        const body: NewService = await c.req.valid("json");
        const service = await createService(body);
        return c.json({
          success: true, 
          message: "Service created", 
          data: service 
        }, 201 );
    
    }
);



services.put("/:id", zValidator("json", serviceSchema, (result, c) => {
    if (!result.success) {
      const validationError = result.error as ZodError<NewService>
      const errorTree = treeifyError(validationError)
      return c.json({ 
        success: false, 
        error: "VALIDATION ERROR", 
        message: "Invalid blogservice payload", 
        data: errorTree 
      }, 400);
    }
  }), async (c) => {
        const id = c.req.param("id");
        const body = await c.req.valid("json");
        let service = await updateService(Number(id), body);
        return c.json({
          success: true,
          message: "Service updated",
          data: service
        }, 200);
    }
);

services.delete("/:id", async (c) => {
        const id = c.req.param("id");
        await deleteService(Number(id));
        return c.json({ success: true, message: "Service deleted" }, 200);
 
});

export default services;