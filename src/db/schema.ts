import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  isDone: boolean().default(false),
});
