import Elysia from "elysia";

import { authRouter } from "../routes/auth.router";

export const auth = new Elysia({ name: "routes", prefix: "/api" }).use(
  authRouter,
);
