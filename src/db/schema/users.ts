import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password").notNull(),
  image: text("image"),
});

export const userSelectSchema = createSelectSchema(users);
export type UserSelectType = typeof userSelectSchema._type;

export const userInsertSchema = createInsertSchema(users);
export type UserInsertType = typeof userInsertSchema._type;
