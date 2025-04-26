import { useGetTasksQuery } from "@/services/task/task.api";
import TaskTable from "./task-table";
import TaskDndBoard from "./task-dnd-board/task-dnd-board";

interface TaskListViewProps {
  view?: "table" | "kanban";
}

function TaskListView({ view = "table" }: TaskListViewProps) {
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

export default TaskListView;
