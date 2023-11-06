import Elysia from "elysia";
import { AuthController } from "../controller/auto.controller";

export const authRouter = new Elysia({
  name: "auth",
  prefix: "/auth",
})
  .use(AuthController.signup)
  .use(AuthController.ping);

// app.use(
//   app.group(
//     "/auth",
//     (app) =>
//       app
//         .get("/ping", () => "pong")
//         .post("/signup", signUp, {
//           body: t.Object({
//             username: t.String(),
//             password: t.String(),
//           }),
//         }),
//     //   .post("/login", login, {
//     //     body: t.Object({
//     //       username: t.String(),
//     //       password: t.String(),
//     //     }),
//     //   }),
//   ),
// );