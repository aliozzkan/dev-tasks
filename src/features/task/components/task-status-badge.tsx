import { TaskStatusEnum } from "@/enums/task-status.enum";
import { cn } from "@/lib/utils";

interface TaskStatusBadgeProps extends React.ComponentProps<"div"> {
  status: TaskStatusEnum;
}

function TaskStatusBadge({ status, ...props }: TaskStatusBadgeProps) {
  const statusTexts = {
    [TaskStatusEnum.Idle]: "Backlog",
    [TaskStatusEnum.Todo]: "Todo",
    [TaskStatusEnum.InProgress]: "In Progress",
    [TaskStatusEnum.Completed]: "Done",
  };

  const statusClassNames = {
    [TaskStatusEnum.Idle]: "bg-zinc-300 text-black",
    [TaskStatusEnum.Todo]: "bg-zinc-500",
    [TaskStatusEnum.InProgress]: "bg-sky-500",
    [TaskStatusEnum.Completed]: "bg-teal-500",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-full",
        statusClassNames[status],
        props.className
      )}
    >
      {statusTexts[status]}
    </div>
  );
}

export default TaskStatusBadge;
