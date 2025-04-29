import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const tasks = pgTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  status: integer().default(0).notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  dueDate: timestamp("due_date", { mode: "string" }),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));

export const taskInsertSchema = createInsertSchema(tasks);
export type TaskInsertType = typeof taskInsertSchema._type;

export const taskUpdateSchema = createUpdateSchema(tasks);
export type TaskUpdateType = typeof taskUpdateSchema._type;
