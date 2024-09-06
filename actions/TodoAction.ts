"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
interface Todo {
  id?: string;
  title: string;
  body?: string | null;
  completed: boolean;
  imageUrl?: string | undefined | null;
}
const prisma = new PrismaClient();
export const getTodo = async ({ userId }: { userId: string | null }) => {
  // if (!userId) {
  //   throw new Error("User ID must be provided");
  // }
  return await prisma.todo.findMany({
    where: {
      user_id: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
//orderBy: {
//   createdAt: "desc",
// }, معناها رتبلي ال Todos من الاحدث للاقدم

export const createTodo = async ({
  title,
  body,
  completed,
  imageUrl,
  userId,
}: {
  title: string;
  body?: string;
  completed: boolean;
  imageUrl?: string;
  userId: string | null;
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      imageUrl,
      user_id: userId as string,
    },
  });
  revalidatePath("/");
};
export const updateTodo = async ({
  title,
  body,
  completed,
  imageUrl,
  id,
}: Todo) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      completed,
      imageUrl,
    },
  });
  revalidatePath("/");
};
export const deleteTodo = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  //بتعمل تحديث للذاكره الموقته علشان بعد ما يتم المسح يتنفذ الامر بشكل صح في شكل الصفحه
};
