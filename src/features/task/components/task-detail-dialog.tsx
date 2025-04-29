import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskStatusEnum } from "@/enums/task-status.enum";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { ComponentProps } from "react";
import { useTaskDetailIdState } from "../hooks/use-management-state";
import TaskStatusBadge from "./task-status-badge";

interface TaskDetailDialogProps {
  taskId: string;
}

function TaskDetailItem({
  children,
  label,
  ...props
}: ComponentProps<"div"> & { label: string }) {
  return (
    <div {...props} className={cn(props.className, "flex flex-col")}>
      <label className="text-xs font-bold text-muted-foreground uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function TaskDetailDialog({ taskId }: TaskDetailDialogProps) {
  const [, setDetailId] = useTaskDetailIdState();
  return (
    <Dialog modal open onOpenChange={() => setDetailId(null)}>
      <DialogContent className="w-full !h-[calc(100dvh/1.5)] !max-w-6xl flex flex-col">
        <DialogHeader className="h-auto">
          <div className="flex gap-4 items-center">
            <DialogTitle>Test Task Detail Dialog</DialogTitle>
            <TaskStatusBadge status={TaskStatusEnum.InProgress} />
          </div>
        </DialogHeader>
        <div className="h-full flex flex-row items-stretch gap-4">
          <div className="bg-muted dark:bg-zinc-900 rounded flex-2/3 p-4 space-y-6">
            <TaskDetailItem label="ID">
              <p>{taskId}</p>
            </TaskDetailItem>
            <TaskDetailItem label="Description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt, nunc at bibendum facilisis, nunc nisl aliquet nunc,
                eget aliquam nisl nunc eget nunc. Sed tincidunt, nunc at
                bibendum facilisis, nunc nisl aliquet nunc, eget aliquam nisl
                nunc eget nunc.
              </p>
            </TaskDetailItem>
          </div>
          <div className="bg-muted dark:bg-zinc-900 rounded flex-1/3 p-4 space-y-6">
            <TaskDetailItem label="Status">
              <Button variant="outline" className="flex justify-between mt-2" size="lg">
                IN PROGRESS
                <ChevronsUpDownIcon className="w-4 text-muted-foreground" />
              </Button>
            </TaskDetailItem>
            <TaskDetailItem label="Due Date">
              <Button variant="outline" className="flex justify-between mt-2" size="lg">
                April 25, 2024
                <ChevronsUpDownIcon className="w-4 text-muted-foreground" />
              </Button>
            </TaskDetailItem>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailDialog;
