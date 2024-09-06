"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import Spinnerr from "./Spinnerr";
import { deleteTodo } from "@/actions/TodoAction";
import EditTodoForm from "./EditTodoForm";
interface Todo {
  id: string;
  title: string;
  body?: string | null;
  completed: boolean;
  imageUrl?: string | undefined | null;
}
function TodoButtom({ todo }: { todo: Todo }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <EditTodoForm todo={todo} />

      <Button
        size={"icon"}
        className="p-2"
        variant={"destructive"}
        onClick={async () => {
          setLoading(true);
          await deleteTodo({ id: todo.id });
          setLoading(false);
        }}
      >
        {loading ? <Spinnerr /> : <Trash size={16} />}
      </Button>
    </>
  );
}

export default TodoButtom;
