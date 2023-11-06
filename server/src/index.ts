import cookie from "@elysiajs/cookie";
import cors from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { auth } from "./module/auth";

const app = new Elysia()
  .use(cors())
  .use(jwt({ name: "myJWT", secret: Bun.env.JWT_SECRET! }))
  .use(cookie())
  .use(auth)
  .listen(4000, ({ hostname, port }) => {
    console.log(`🦊 Running http://${hostname}:${port}`);
  });

export default app;
