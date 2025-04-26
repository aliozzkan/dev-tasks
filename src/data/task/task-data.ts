import { db } from "@/db";
import { taskInsertSchema, TaskInsertType, tasks } from "@/db/schema/tasks";

export const insertTask = async (data: TaskInsertType) => {
  const parsed = taskInsertSchema.parse(data);

  const result = await db
    .insert(tasks)
    .values(parsed)
    .returning({ insertedId: tasks.id });

  if (!result[0]) {
    throw new Error("Task not inserted");
  }

  return result[0].insertedId;
};
