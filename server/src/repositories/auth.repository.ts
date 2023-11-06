import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt";

export class AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findUser(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
  }
  async createUser(username: string, password: string) {
    const { hash, salt } = await hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        username,
        hash,
        salt,
      },
    });
    return newUser;
  }
}
