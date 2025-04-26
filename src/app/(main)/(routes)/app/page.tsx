"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import TaskCreateDialog from "@/features/task/task-create-dialog";
import TaskListView from "@/features/task/task-list-view";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [view, setView] = useState<"table" | "kanban">("table");

  return (
    <main>
      <div className="mb-10">
        <Heading size="lg">Task Management</Heading>
        <p className="text-muted-foreground">
          Create and manage your tasks efficiently.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-5">
          <div className="flex">
            <div className="ml-auto">
              <TaskCreateDialog />
            </div>
          </div>

          <div className="h-14 border border-dashed border-x-0 border-border w-full flex items-center gap-4 px-1">
            <Button variant="secondary" onClick={() => setView("kanban")}>
              {view === "kanban" && <CheckIcon className="w-4 h-4" />}
              Kanban
            </Button>
            <Button variant="secondary" onClick={() => setView("table")}>
              {view === "table" && <CheckIcon className="w-4 h-4" />}
              Table
            </Button>
          </div>

          <TaskListView view={view} />
        </CardContent>
      </Card>
    </main>
  );
}
