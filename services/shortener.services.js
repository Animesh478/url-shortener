import { db } from "../config/db.js";
import { shortLinkModel } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getAllShortLinks = async function (userId) {
  const result = await db
    .select()
    .from(shortLinkModel)
    .where(eq(userId, shortLinkModel.userId));
  return result;
};

export const getLinkByShortCode = async function (shortCode) {
  const [result] = await db
    .select()
    .from(shortLinkModel)
    .where(eq(shortLinkModel.shortCode, shortCode));

  return result;
};

export const insertLink = async function ({
  url,
  finalShortCode: shortCode,
  userId,
}) {
  await db.insert(shortLinkModel).values({ url, shortCode, userId });
};
