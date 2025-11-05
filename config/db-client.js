import { MongoClient } from "mongodb";
import { env } from "./env.js";

const uri = env.MONGODB_URI;
export const dbClient = new MongoClient(uri);
