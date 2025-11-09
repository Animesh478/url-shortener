// import { MongoClient } from "mongodb";\
import mongoose from "mongoose";
import { env } from "./env.js";

// const uri = env.MONGODB_URI;
// export const dbClient = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await mongoose.connect(`${env.MONGODB_URI}/${env.MONGODB_DATABASE_NAME}`);
    mongoose.set("debug", true);
  } catch (error) {
    console.log(error);
  }
};
