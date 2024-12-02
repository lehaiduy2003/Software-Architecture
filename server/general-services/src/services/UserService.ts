import prisma from "../../prisma/database";

export default class UserService {
  public getAllUsers = async () => {
    return [];
  };

  public getUserById = async (userId: number) => {
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
}
