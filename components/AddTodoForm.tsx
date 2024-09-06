"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BellPlus, Save } from "lucide-react";
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
import { createTodo, getTodo } from "@/actions/TodoAction";
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
function AddTodoForm({ userId }: { userId: string | null }) {
  const onSubmit = async (data: ProfileFormValues) => {
    console.log(data);
    await createTodo({
      title: data.title,
      body: data.body,
      completed: data.completed,
      imageUrl: data.imageUrl,
      userId,
    });
    setopen(false);
  };

  const defaultValues: Partial<ProfileFormValues> = {
    title: "Title",
    body: " body",
    completed: false,
    imageUrl: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const [open, setopen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild className="ml-auto my-5">
        <Button
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-800 dark:via-purple-800  dark:to-pink-800 dark:text-white"
          size={"lg"}
        >
          New Todo <BellPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
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

export default AddTodoForm;
