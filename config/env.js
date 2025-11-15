import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const env = z
  .object({
    PORT: z.coerce.number().default(3001),
  })
  .parse(process.env);
