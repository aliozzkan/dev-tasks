import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren, ReactNode } from "react";
import TaskStatusBadge from "../task-status-badge";
import { Badge } from "@/components/ui/badge";

interface DroppableColumnProps extends PropsWithChildren {
  id: string;
  title: string;
}

function DroppableColumn(props: DroppableColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  return (
    <div>
      <div
        ref={setNodeRef}
        className={cn(
          "w-[calc(100vw-140px)] md:w-72 min-h-[500px] bg-muted rounded shadow-sm border border-border p-2",
          isOver && "border-primary"
        )}
      >
        <div className="flex gap-4 items-center px-1 mt-2">
          <div className="w-4 h-4 rounded-full border border-primary border-dashed"></div>
          <div>
            <TaskStatusBadge status={+props.id} />
          </div>
          <Badge variant="outline" className="ml-auto">
            {(props.children as ReactNode[])?.length}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 mt-4">{props.children}</div>
      </div>
    </div>
  );
}

export default DroppableColumn;
