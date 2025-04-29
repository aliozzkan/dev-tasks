import { InferResultType } from "./db.types";

export type TaskType = InferResultType<"tasks", { user: true }>;
