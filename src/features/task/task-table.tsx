import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskStatusEnum } from "@/enums/task-status.enum";
import { useUpdateTaskMutation } from "@/services/task/task.api";
import { InferResultType } from "@/types/db.types";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  ClockIcon,
  CopyIcon,
  Edit2Icon,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react";
import TaskStatusBadge from "./task-status-badge";

interface TaskTableProps {
  data: InferResultType<"tasks", { user: true }>[];
}

function TaskTable(props: TaskTableProps) {
  const [updateTaskMutate] = useUpdateTaskMutation();

  const handleStatusChange = async (taskId: string, status: TaskStatusEnum) => {
    await updateTaskMutate({
      id: taskId,
      status,
    });
  };

  return (
    <DataTable
      sorting={[
        {
          id: "createdAt",
          desc: true,
        },
      ]}
      columns={[
        {
          accessorKey: "id",
          header: "#Id",
          cell: ({ row }) => {
            const idText = row.getValue("id") as string;
            return (
              <div className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                {idText?.split("-")[0]}
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1"
                  onClick={() => {
                    navigator.clipboard.writeText(idText);
                  }}
                >
                  <CopyIcon />
                </Button>
              </div>
            );
          },
        },
        {
          accessorKey: "title",
          header: "Title",
        },
        {
          accessorKey: "description",
          header: "Description",
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: ({ row }) => {
            const status = row.getValue("status");

            return (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <TaskStatusBadge
                    status={status as TaskStatusEnum}
                    className="cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    TaskStatusEnum.Idle,
                    TaskStatusEnum.Todo,
                    TaskStatusEnum.InProgress,
                    TaskStatusEnum.Completed,
                  ].map((status) => (
                    <DropdownMenuItem
                      key={`${status}`}
                      onClick={() =>
                        handleStatusChange(row.getValue("id"), status)
                      }
                    >
                      <TaskStatusBadge status={status} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
            return;
          },
        },
        {
          accessorKey: "user.name",
          header: "User",
        },
        {
          sortDescFirst: true,
          sortingFn: "datetime",
          accessorKey: "createdAt",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="px-0 justify-start"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Created At
                {column.getIsSorted() === "desc" ? (
                  <ArrowUp className="w-2" />
                ) : (
                  <ArrowDown className="w-2" />
                )}
              </Button>
            );
          },
          cell: ({ row }) => {
            const createdDate = new Date(row.getValue("createdAt"));
            return (
              <span className="flex flex-row gap-3">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3" />
                  {format(createdDate, "dd MMM yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3" />
                  {format(createdDate, "kk:mm")}
                </span>
              </span>
            );
          },
        },
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const payment = row.original;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="left"
                  className="min-w-52"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(payment.id)}
                    >
                      <CopyIcon />
                      Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2Icon />
                      Edit Task
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      <Trash2Icon />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]}
      data={props.data}
      filterColumnName="title"
    />
  );
}

export default TaskTable;
