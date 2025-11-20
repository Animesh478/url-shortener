import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { userModel } from "../db/schema.js";
import argon2 from "argon2";

export const getUserByEmail = async function (email) {
  const [user] = await db
    .select()
    .from(userModel)
    .where(eq(userModel.email, email));
  return user;
};

export const createUser = async function ({ name, email, password }) {
  return await db
    .insert(userModel)
    .values({ name, email, password })
    .$returningId();
};

export const hashPassword = async function (password) {
  return await argon2.hash(password);
};

export const comparePassword = async function (password, hash) {
  return await argon2.verify(hash, password);
};
