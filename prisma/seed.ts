import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  //?Generate fake data from Todo
  await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => ({
      title: faker.lorem.text(),
      body: faker.lorem.paragraph(),
      imageUrl: faker.image.avatar(),
      user_id: faker.internet.userName(),
    })),
  });
  //?Generate fake data from User
  // await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () => {
  //     return {
  //       email: faker.internet.email(),
  //       name: faker.internet.userName(),
  //       address: {
  //         street: faker.location.streetAddress(),
  //         city: faker.location.city(),
  //         state: faker.location.state(),
  //         zip: faker.location.zipCode(),
  //       },
  //     };
  //   }),
  // });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
