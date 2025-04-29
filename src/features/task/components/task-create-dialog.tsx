import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import TaskCreateForm from "./task-create-form";
import { Button } from "@/components/ui/button";

function TaskCreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="mb-4">
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Create a new task and assign it to a user.
          </DialogDescription>
        </DialogHeader>
        <TaskCreateForm
          onSuccess={() => {
            document.getElementById("close-dialog")?.click();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default TaskCreateDialog;
