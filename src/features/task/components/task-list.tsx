import { useGetTasksQuery } from "@/services/task/task.api";
import TaskTable from "./task-table";
import TaskDndBoard from "./task-dnd-board/task-dnd-board";

export type ViewType = "table" | "kanban";

interface TaskListViewProps {
  view?: ViewType;
}

function TaskList({ view = "table" }: TaskListViewProps) {
  const tasksQuery = useGetTasksQuery();

  return (
    <div>
      {view === "table" && <TaskTable data={tasksQuery.data ?? []} />}
      {view === "kanban" && (
        <>
          {tasksQuery.isSuccess && (
            <TaskDndBoard data={tasksQuery.data ?? []} />
          )}
        </>
      )}
    </div>
  );
}

export default TaskList;
