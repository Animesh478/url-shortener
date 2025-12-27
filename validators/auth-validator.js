import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email" })
    .max(100, { message: "Email must not be more than 100 characters" }),
  password: z
    .string()
    .trim()
    .min(3, { message: "Password should be atleast 3 characters" })
    .max(100, { message: "Password must not have more than 100 characters" }),
});

export const registerUserSchema = loginUserSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name should be atleast 3 characters" })
    .max(100, { message: "Name must not have more than 100 characters" }),
});
