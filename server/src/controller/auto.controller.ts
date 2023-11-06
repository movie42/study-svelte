import { SetCookieOptions } from "@elysiajs/cookie";
import { JWTPayloadSpec } from "@elysiajs/jwt";
import Elysia from "elysia";
import { authService } from "../plugins/auth.plugin";
import { AuthService } from "../services/auth.service";

interface SignUp {
  body: {
    username: string;
    password: string;
  };
  authService: AuthService;
}

interface Login extends SignUp {
  myJWT: {
    readonly sign: (
      morePayload: Record<string, string> & JWTPayloadSpec,
    ) => Promise<string>;
    readonly verify: (
      jwt?: string | undefined,
    ) => Promise<false | (Record<string, string> & JWTPayloadSpec)>;
  };
  setCookie: (
    name: string,
    value: string,
    options?: SetCookieOptions | undefined,
  ) => void;
}
export namespace AuthController {
  export const ping = new Elysia({ name: "ping" }).get("/ping", () => "pong");
  export const signup = new Elysia({ name: "signup" })
    .use(authService)
    .post("/signup", async ({ body, authService }) => {
      const { username, password } = body as {
        username: string;
        password: string;
      };
      const findUser = await authService.findUser(username);
      if (findUser) {
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
    });

  // export const login = async ({ body, set, myJWT, setCookie }: Login) => {
  //   const { username, password } = body;
  //   console.log(username, password);
  //   const user = await prisma.user.findFirst({
  //     where: {
  //       username,
  //     },
  //     select: {
  //       id: true,
  //       hash: true,
  //       salt: true,
  //     },
  //   });

  //   if (!user) {
  //     set.status = 400;
  //     return {
  //       success: false,
  //       data: null,
  //       message: "Invalid credentials",
  //     };
  //   }

  //   const match = await comparePassword(password, user.salt, user.hash);
  //   if (!match) {
  //     set.status = 400;
  //     return {
  //       success: false,
  //       data: null,
  //       message: "Invalid credentials",
  //     };
  //   }

  //   const accessToken = await myJWT.sign({
  //     userId: user.id,
  //   });

  //   setCookie("access_token", accessToken, {
  //     maxAge: 15 * 60,
  //     path: "/",
  //   });

  //   return {
  //     success: true,
  //     data: null,
  //     message: "Account login successfully",
  //   };
  // };
}
