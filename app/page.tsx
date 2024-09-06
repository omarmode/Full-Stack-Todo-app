import { getTodo } from "@/actions/TodoAction";
import AddTodoForm from "@/components/AddTodoForm";
import { TodoTable } from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const Todos = await getTodo({ userId });
  return (
    <main className="container">
      <AddTodoForm userId={userId} />
      <TodoTable todos={Todos} />
    </main>
  );
}
