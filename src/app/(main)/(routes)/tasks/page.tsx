"use client";

import { Heading } from "@/components/ui/heading";
import TaskManagementView from "@/features/task/views/task-management-view";

export default function Home() {
  return (
    <main className="pb-10">
      <div className="mb-10">
        <Heading size="lg">Task Management</Heading>
        <p className="text-muted-foreground">
          Create and manage your tasks efficiently.
        </p>
      </div>

      <TaskManagementView />
    </main>
  );
}
