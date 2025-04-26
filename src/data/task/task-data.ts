import { db } from "@/db";
import {
  taskInsertSchema,
  TaskInsertType,
  tasks,
  TaskUpdateType,
} from "@/db/schema/tasks";
import { eq } from "drizzle-orm";

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

export const getTasks = async (userId: string) => {
  const result = await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.userId, userId),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

export const updateTask = async (data: TaskUpdateType) => {
  const result = await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, data.id!))
    .returning({ updatedId: tasks.id });

  if (!result[0]) {
    throw new Error("Task not updated");
  }

  return result[0].updatedId;
};
