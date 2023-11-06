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
  .derive(({ authRepository }) => ({
    authService: new AuthService(authRepository),
  }));
