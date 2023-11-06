import { SetCookieOptions } from "@elysiajs/cookie";
import { JWTPayloadSpec } from "@elysiajs/jwt";
import { Context } from "elysia";
import { prisma } from "../lib/prisma";
import { comparePassword, hashPassword } from "../utils/bcrypt";

interface SignUp {
  body: {
    username: string;
    password: string;
  };
  set: Context["set"];
}
export const signUp = async ({ body, set }: SignUp) => {
  const { username, password } = body;
  const usernameExists = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (usernameExists) {
    set.status = 400;
    return {
      success: false,
      data: null,
      message: "Email address already in use.",
    };
  }
  const { hash, salt } = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      username,
      hash,
      salt,
    },
  });

  return {
    success: true,
    message: "회원가입을 완료했습니다.",
    data: {
      user: newUser,
    },
  };
};

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

export const login = async ({ body, set, myJWT, setCookie }: Login) => {
  const { username, password } = body;
  console.log(username, password);
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      id: true,
      hash: true,
      salt: true,
    },
  });

  if (!user) {
    set.status = 400;
    return {
      success: false,
      data: null,
      message: "Invalid credentials",
    };
  }

  const match = await comparePassword(password, user.salt, user.hash);
  if (!match) {
    set.status = 400;
    return {
      success: false,
      data: null,
      message: "Invalid credentials",
    };
  }

  const accessToken = await myJWT.sign({
    userId: user.id,
  });

  setCookie("access_token", accessToken, {
    maxAge: 15 * 60,
    path: "/",
  });

  return {
    success: true,
    data: null,
    message: "Account login successfully",
  };
};
