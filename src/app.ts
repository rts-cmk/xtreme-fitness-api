import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import assets from "./features/assets/api";
import icons from "./features/icons/api";
import benefits from "./features/benefits/api";
import services from "./features/services/api";
import reviews from "./features/reviews/api";
import memberships from "./features/memberships/api";
import advantages from "./features/advantages/api";
import messages from "./features/messages/api";
import employees from "./features/employees/api";

// error handling middleware
import { errorHandler } from "./middleware/errorHandler";

const app = new Hono();
app.use("*", cors());
app.use("*", logger());
app.use("*", errorHandler);

app.use("/", serveStatic({ root: "./public" }));
app.use("/file-bucket/*", serveStatic({ root: "./public" }));

app.route("/assets", assets);
app.route("/benefits", benefits);
app.route("/services", services);
app.route("/icons", icons);
app.route("/reviews", reviews);
app.route("/memberships", memberships);
app.route("/advantages", advantages);
app.route("/messages", messages);
app.route("/employees", employees);

export default app;
