"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TodoButtom from "./TodoButtom";

interface Todo {
  id: string;
  title: string;
  body?: string | null;
  completed: boolean;
  imageUrl?: string | undefined | null;
}

interface TodoTableProps {
  todos: Todo[];
}

export function TodoTable({ todos }: TodoTableProps) {
  const [loading, setloading] = useState(false);
  return (
    <Table>
      <TableCaption>A list of your Todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Body</TableHead> {/* إضافة عمود الـ Body */}
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo?.id}>
            <TableCell>
              <Avatar className="w-12 h-12">
                {todo?.imageUrl ? (
                  <AvatarImage src={todo?.imageUrl} alt={todo?.title} />
                ) : (
                  <AvatarFallback>No Image</AvatarFallback>
                )}
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{todo?.title}</TableCell>
            <TableCell>{todo?.body || "No body available"}</TableCell>{" "}
            {/* عرض الـ Body */}
            <TableCell>
              {todo.completed ? (
                <Badge className="bg-green-400 dark:bg-green-600">
                  Completed
                </Badge>
              ) : (
                <Badge variant={"destructive"}>UnCompleted</Badge>
              )}
            </TableCell>
            <TableCell className="text-right flex justify-end">
              <TodoButtom todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-right font-bold">
            {" "}
            {/* تعديل التنسيقات */}
            Total Todos: {todos.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
