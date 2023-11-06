import { t } from "elysia";
import app from "..";
import { login, signUp } from "../controller/auto.controller";

export const auth = app.use(
  app.group("/auth", (app) =>
    app
      .get("/ping", () => "pong")
      .post("/signup", signUp, {
        body: t.Object({
          username: t.String(),
          password: t.String(),
        }),
      })
      .post("/login", login, {
        body: t.Object({
          username: t.String(),
          password: t.String(),
        }),
      }),
  ),
);
