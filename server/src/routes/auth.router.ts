import Elysia from "elysia";
import { AuthController } from "../controller/auto.controller";

export const authRouter = new Elysia({
  name: "auth",
  prefix: "/auth",
})
  .use(AuthController.signup)
  .use(AuthController.login);
