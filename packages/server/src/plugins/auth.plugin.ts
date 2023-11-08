import cookie from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import Elysia from "elysia";

import { prisma } from "../lib/prisma";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";

export const authRepository = new Elysia({
  name: "authRepository",
}).derive(() => ({
  authRepository: new AuthRepository(prisma),
}));

export const authService = new Elysia({
  name: "authService",
})
  .use(authRepository)
  .use(jwt({ name: "jwt", secret: Bun.env.JWT_SECRET! }))
  .use(cookie())
  .derive(({ authRepository }) => ({
    authService: new AuthService(authRepository),
  }));
