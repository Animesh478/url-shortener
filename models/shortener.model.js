import { env } from "../config/env.js";
import { dbClient } from "../config/db-client.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const shortenerCollection = db.collection("urlShortener");

export const loadLinks = async function () {
  try {
    return await shortenerCollection.find().toArray();
  } catch (error) {
    console.log(error);
  }
};

export const saveLinks = async function (link) {
  await shortenerCollection.insertOne(link);
};

export const getLinkByShortCode = async function (shortCode) {
  return await shortenerCollection.findOne({ finalShortCode: shortCode });
};
