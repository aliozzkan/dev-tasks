import { TaskStatusEnum } from "@/enums/task-status.enum";
import { useUpdateTaskMutation } from "@/services/task/task.api";
import { InferResultType } from "@/types/db.types";
import { DndContext } from "@dnd-kit/core";
import DraggableCard from "./draggable-card";
import DroppableColumn from "./droppable-column";
import { useEffect, useState } from "react";

interface TasksDndBoardProps {
  data: InferResultType<"tasks", { user: true }>[];
}

function TaskDndBoard(props: TasksDndBoardProps) {
  const [updateTaskMutate] = useUpdateTaskMutation();
  const [tasksState, setTasksState] = useState(props.data);

  function renderTaskCards(status: TaskStatusEnum) {
    return tasksState
      .filter((task) => task.status === status)
      .map((task) => (
        <DraggableCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description ?? ""}
        />
      ));
  }

  useEffect(() => {
    setTasksState(props.data);
  }, [props.data])

  return (
    <div>
      <DndContext
        onDragEnd={async (event) => {
          const task = props.data.find((task) => task.id === event.active.id);
          if (!task) return;

          if (!event.over) return;

          const newStatus = +event.over?.id as TaskStatusEnum;

          const newTasksState = tasksState.map((task) => {
            if (task.id === event.active.id) {
              return {
                ...task,
                status: newStatus,
              };
            }
            return task;
          });

          setTasksState(newTasksState);

          await updateTaskMutate({
            id: task.id,
            status: newStatus,
          });
        }}
      >
        <div className="flex gap-10">
          <DroppableColumn id={TaskStatusEnum.Todo.toString()} title="Todo">
            {renderTaskCards(TaskStatusEnum.Todo)}
          </DroppableColumn>
          <DroppableColumn
            id={TaskStatusEnum.InProgress.toString()}
            title="In Progress"
          >
            {renderTaskCards(TaskStatusEnum.InProgress)}
          </DroppableColumn>
          <DroppableColumn
            id={TaskStatusEnum.Completed.toString()}
            title="Done"
          >
            {renderTaskCards(TaskStatusEnum.Completed)}
          </DroppableColumn>
        </div>
      </DndContext>
    </div>
  );
}

export default TaskDndBoard;
