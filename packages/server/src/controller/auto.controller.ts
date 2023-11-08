import Elysia, { t } from "elysia";
import { authService } from "../plugins/auth.plugin";
import { comparePassword } from "../utils/bcrypt";

const schema = {
  body: t.Object({
    username: t.String(),
    password: t.String(),
  }),
};

export namespace AuthController {
  export const ping = new Elysia({ name: "ping" }).get("/ping", () => "pong");
  export const signup = new Elysia({ name: "signup" }).use(authService).post(
    "/signup",
    async ({ body, authService, set }) => {
      const { username, password } = body;
      const findUser = await authService.findUser(username);

      if (findUser) {
        set.status = 409;
        return {
          success: false,
          message: "이미 가입한 회원입니다.",
          data: null,
        };
      }
      const createUser = await authService.createUser(username, password);

      if (!createUser) {
        return createUser;
      }

      return {
        success: true,
        message: "회원가입을 완료했습니다.",
        data: {
          user: createUser,
        },
      };
    },
    schema,
  );

  export const login = new Elysia({ name: "signup" }).use(authService).post(
    "/login",
    async ({ body, set, authService, jwt, setCookie }) => {
      const { username, password } = body;
      const user = await authService.findUser(username);

      if (!user) {
        set.status = 400;
        return {
          success: false,
          data: null,
          message: "아이디 또는 비밀번호를 다시 입력해주세요.",
        };
      }

      const match = await comparePassword(password, user.salt, user.hash);

      if (!match) {
        set.status = 400;
        return {
          success: false,
          data: null,
          message: "아이디 또는 비밀번호를 다시 입력해주세요.",
        };
      }

      const accessToken = await jwt.sign({
        userId: user.id,
      });

      setCookie("access_token", accessToken, {
        maxAge: 15 * 60,
        path: "/",
        sameSite: "none",
        httpOnly: true,
        domain: "http://localhost:5173",
      });

      return {
        success: true,
        data: accessToken,
        message: "Account login successfully",
      };
    },
    schema,
  );
}
