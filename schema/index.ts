import { z } from "zod";

export const profileFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "title must be at least 5 characters.",
    })
    .max(30, {
      message: "title must not be longer than 30 characters.",
    }),
  body: z
    .string()

    .max(80, {
      message: "body must not be longer than 80 characters.",
    })
    .optional(),
  completed: z.boolean(),
  imageUrl: z.string(),
  id: z.string().optional(),
});
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
