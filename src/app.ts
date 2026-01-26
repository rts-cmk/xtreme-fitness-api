import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Hono } from "hono";
import { serveStatic } from '@hono/node-server/serve-static'

// error handling middleware
import { errorHandler } from "./middleware/errorHandler";

const app = new Hono();
app.use("*", cors());
app.use("*", logger());
app.use("*", errorHandler);


app.use('/', serveStatic({ root: './public' }));
app.use('/file-bucket/*', serveStatic({ root: './public' }));






export default app;
