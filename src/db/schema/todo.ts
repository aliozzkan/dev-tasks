import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const todos = pgTable("todo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  isDone: boolean().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const todoSelectSchema = createSelectSchema(todos);
export const todoInsertSchema = createSelectSchema(todos);
