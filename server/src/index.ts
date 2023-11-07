import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { auth } from "./module/auth";

const app = new Elysia().use(cors()).use(auth);

app.listen(4000, ({ hostname, port }) => {
  console.log(`🦊 Running http://${hostname}:${port}`);
});

export default app;
