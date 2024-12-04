import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const roleSeed = async () => {
  // Check if the roles table is empty
  const rolesCount = await prisma.roles.count();

  if (rolesCount === 0) {
    const roles = Object.values(Role);

    for (const role of roles) {
      await prisma.roles.create({
        data: {
          name: role,
        },
      });
    }

    console.log("Roles have been seeded.");
  } else {
    console.log("Roles table is not empty. Skipping seeding.");
  }
};

const categorySeed = async () => {
  const category = [
    "rice",
    "noodle",
    "soup",
    "Snacks",
    "Drinks",
    "Desserts",
    "salad",
    "vegetarian",
    "other",
  ];
  // Check if the roles table is empty
  const categoryCount = await prisma.categories.count();

  if (categoryCount === 0) {
    const categories = Object.values(category);

    for (const category of categories) {
      await prisma.categories.create({
        data: {
          name: category,
        },
      });
    }

    console.log("categories have been seeded.");
  } else {
    console.log("categories table is not empty. Skipping seeding.");
  }
};

const userSeed = async () => {
  const user = {
    id: "48d241f9-cc71-404d-886b-917dcb6ff4f3",
    name: "John Doe",
    email: "abc@example.com",
    phone: "1234567890",
    password: "password",
    roleId: 1,
  };

  const userCount = await prisma.users.count();

  if (userCount === 0) {
    await prisma.users.create({
      data: user,
    });

    console.log("User has been seeded.");
  } else console.log("User table is not empty. Skipping seeding.");
};

const restaurantSeed = async () => {
  const restaurant = {
    id: "a61f26df-9b45-4764-9075-23efce13d259",
    name: "Restaurant A",
    address: "123, ABC Street",
    phone: "1234567890",
    imageUrl: "image-url",
    userId: "48d241f9-cc71-404d-886b-917dcb6ff4f3",
  };

  const restaurantCount = await prisma.restaurants.count();
  if (restaurantCount === 0) {
    await prisma.restaurants.create({
      data: restaurant,
    });

    console.log("Restaurant has been seeded.");
  } else console.log("Restaurant table is not empty. Skipping seeding.");
};

const foodSeed = async () => {
  const food = {
    name: "Fried Rice",
    categoryId: 1,
    price: 25000,
    description: "Delicious fried rice",
    imageUrl: "image-url",
    restaurantId: "a61f26df-9b45-4764-9075-23efce13d259",
  };

  const foodCount = await prisma.foods.count();
  if (foodCount === 0) {
    await prisma.foods.create({
      data: food,
    });

    console.log("Food has been seeded.");
  } else {
    console.log("Food table is not empty. Skipping seeding.");
  }
};

async function main() {
  await roleSeed();
  await categorySeed();
  await userSeed();
  await restaurantSeed();
  await foodSeed();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
