import prisma from "../../prisma/database";
import { User } from "../libs/zod/types/UserValidates";

export default class UserService {
  public getAllUsers = async () => {
    return [];
  };

  public getUserById = async (userId: string) => {
    const user = await prisma.users.findUnique({
      where: {
        id: userId, // Replace with your user id
      },
      include: {
        Roles: {
          select: {
            name: true, // Just get the name of the role
          },
        },
      },
    });
    if (!user) {
      return null;
    }
    return user;
  };

  public updateUser = async (userId: string, data: User) => {
    return await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });
  }

  public deleteUser = async (userId: string) => {
    return await prisma.users.delete({
      where: {
        id: userId,
      },
    });
  }
}
