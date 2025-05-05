import AppFullCalendar from "@/components/utils/full-calendar/full-calendar";
import { TaskStatusEnum } from "@/enums/task-status.enum";
import { InferResultType } from "@/types/db.types";
import { parseISO, format } from "date-fns";
import { useManagementActions } from "../hooks/use-management-state";

interface TaskCalendarProps {
  data: InferResultType<"tasks", { user: true }>[];
}

function TaskCalendar(props: TaskCalendarProps) {
  const { clickDetail } = useManagementActions();

  function getTaskColor(task: InferResultType<"tasks", { user: true }>) {
    switch (task.status) {
      case TaskStatusEnum.Completed:
        return "!bg-teal-500";
      case TaskStatusEnum.InProgress:
        return "!bg-sky-500";
      case TaskStatusEnum.Todo:
        return "!bg-zinc-500";
      default:
        return "!bg-zinc-400 !text-black";
    }
  }

  return (
    <AppFullCalendar
      events={props.data.map((task) => ({
        id: task.id,
        title: task.title,
        date: task.dueDate
          ? format(parseISO(task.dueDate), "yyyy-MM-dd")
          : undefined,
        color: getTaskColor(task),
      }))}
      onEventClick={(event) => {
        clickDetail(event.id);
      }}
    />
  );
}

export default TaskCalendar;
