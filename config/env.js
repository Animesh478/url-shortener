import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const env = z
  .object({
    PORT: z.coerce.number().default(3001),
    // MONGODB_URI: z.string(),
    // MONGODB_DATABASE_NAME: z.string(),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
  })
  .parse(process.env);
