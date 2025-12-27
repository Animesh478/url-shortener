import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const shortLinkModel = mysqlTable("short_links", {
  id: int().autoincrement().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  shortCode: varchar("short_code", { length: 255 }).notNull().unique(),
  userId: int("user_id")
    .notNull()
    .references(() => userModel.id),
});

export const userModel = mysqlTable("users", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// This makes querying easier without having to do joins
export const userRelations = relations(userModel, ({ many }) => ({
  shortLinks: many(shortLinkModel),
}));

export const shortLinkRelations = relations(shortLinkModel, ({ one }) => ({
  users: one(userModel, {
    fields: [shortLinkModel.userId],
    references: [userModel.id],
  }),
}));
