"use server";

import { db } from "@/db";
import { userInsertSchema, UserInsertType, users } from "@/db/schema/users";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { and } from "drizzle-orm";

export const insertUser = async (data: UserInsertType) => {
  const parsed = userInsertSchema.parse(data);

  const result = await db
    .insert(users)
    .values({ ...parsed, password: await hashPassword(parsed.password) })
    .returning({ insertedId: users.id });

  if (!result[0]) {
    throw new Error("User not inserted");
  }

  return result[0].insertedId;
};

export const getUserByCredentials = async (data: {
  email: string;
  password: string;
}) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => and(eq(users.email, data.email)),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await comparePassword(data.password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return user;
};
