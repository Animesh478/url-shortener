import { z } from "zod";

export const urlShortCodeSchema = z.object({
  url: z.string().trim().url(),
  shortCode: z
    .string()
    .trim()
    .min(3, { message: "Short code must have atleast 3 characters" })
    .max(50, { message: "Short code cannot have more than 50 characters" }),
});
