import cookie from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(jwt({ name: "myJWT", secret: Bun.env.JWT_SECRET! }))
  .use(cookie())
  .listen(4000);

export default app;
