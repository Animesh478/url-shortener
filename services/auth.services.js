import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { userModel } from "../db/schema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

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

export const generateToken = function ({ name, email, id }) {
  return jwt.sign({ name, email, id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

// verifying the token received and returning the decoded payload
export const verifyJWTToken = function (token) {
  return jwt.verify(token, process.env.JWT_KEY);
};
