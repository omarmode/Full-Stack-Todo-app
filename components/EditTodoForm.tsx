"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BellPlus, Pen, Save } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTodo, getTodo, updateTodo } from "@/actions/TodoAction";
import { json } from "stream/consumers";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { profileFormSchema, ProfileFormValues } from "@/schema";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface Todo {
  id?: string;
  title: string;
  body?: string | null;
  completed: boolean;
  imageUrl?: string | undefined | null;
}
function EditTodoForm({ todo }: { todo: Todo }) {
  const onSubmit = async (data: ProfileFormValues) => {
    console.log(data);
    await updateTodo({
      id: todo.id,
      title: data.title,
      body: data.body as string,
      imageUrl: data.imageUrl as string,
      completed: data.completed,
    });
    setopen(false);
  };

  const defaultValues: Partial<ProfileFormValues> = {
    title: todo.title,
    body: todo.body ?? undefined,
    completed: todo.completed,
    imageUrl: todo.imageUrl ?? undefined,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const [open, setopen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  useEffect(() => {
    if (todo.imageUrl) {
      setImagePreview(todo.imageUrl);
    }
  }, [todo.imageUrl]);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild className="ml-auto">
        <Button variant="default" size={"default"}>
          <Pen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit This Todo</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className=" gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>title</FormLabel>
                    <FormControl>
                      <Input placeholder="have fun" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and
                      organizations to link to them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Paste the image URL here"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setImagePreview(e.target.value); // تحديث الصورة في الـ state
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <Avatar className="w-24 h-24">
                  <AvatarImage src={imagePreview} alt="Selected image" />
                  <AvatarFallback>Image</AvatarFallback>
                </Avatar>
              )}
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>body</FormLabel> */}
                    <FormControl>
                      <div>
                        {" "}
                        <Switch
                          id="airplane-mode"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="airplane-mode">Completed</Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-800 dark:bg-blue-500 dark:hover:bg-blue-600"
                onClick={() =>
                  toast("Todo has been created", {
                    description: "Todo has been created",
                  })
                }
              >
                Save changes
                <Save />
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditTodoForm;
