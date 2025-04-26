"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskCreateForm from "@/features/task/task-create-form";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Hello World</h1>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Create a new task and assign it to a user.
            </DialogDescription>
          </DialogHeader>
          <TaskCreateForm onSuccess={() => {
            document.getElementById("close-dialog")?.click();
          }} />
        </DialogContent>
      </Dialog>
    </main>
  );
}
