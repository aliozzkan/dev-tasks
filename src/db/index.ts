import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./schema/users";
import { accounts } from "./schema/accounts";
import { sessions } from "./schema/sessions";
import { todos } from "./schema/todo";
export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema: {
    users,
    accounts,
    sessions,
    todos,
  },
});
