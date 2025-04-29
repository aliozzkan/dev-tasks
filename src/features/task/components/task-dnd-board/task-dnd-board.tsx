import { TaskStatusEnum } from "@/enums/task-status.enum";
import { useUpdateTaskMutation } from "@/services/task/task.api";
import { InferResultType } from "@/types/db.types";
import { DndContext } from "@dnd-kit/core";
import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import DraggableCard from "./draggable-card";
import DroppableColumn from "./droppable-column";

interface TasksDndBoardProps {
  data: InferResultType<"tasks", { user: true }>[];
}

function TaskDndBoard(props: TasksDndBoardProps) {
  const [updateTaskMutate] = useUpdateTaskMutation();
  const [tasksState, setTasksState] = useState(props.data);

  function renderTaskCards(status: TaskStatusEnum) {
    return tasksState
      .filter((task) => task.status === status)
      .sort((a, b) => {
        const aCreatedAt = parseISO(a.createdAt as unknown as string);
        const bCreatedAt = parseISO(b.createdAt as unknown as string);

        return bCreatedAt.getTime() - aCreatedAt.getTime();
      })
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
  }, [props.data]);

  return (
    <div className="max-w-[calc(100vw-82px)] md:max-w-[calc(100vw-256px-82px)] overflow-x-scroll">
      <DndContext
        onDragEnd={async (event) => {
          const task = props.data.find((task) => task.id === event.active.id);
          if (!task) return;

          if (!event.over) return;

          const newStatus = +event.over?.id as TaskStatusEnum;

          if (task.status === newStatus) return;

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
        <div className="flex gap-4 md:gap-10">
          <DroppableColumn id={TaskStatusEnum.Idle.toString()} title="Backlog">
            {renderTaskCards(TaskStatusEnum.Idle)}
          </DroppableColumn>
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
