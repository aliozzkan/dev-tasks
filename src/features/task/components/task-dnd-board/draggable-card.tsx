import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { GripVerticalIcon } from "lucide-react";
import { useManagementActions } from "../../hooks/use-management-state";

interface DraggableCardProps {
  id: string;
  title: string;
  description: string;
}

function DraggableCard(props: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const { clickDetail } = useManagementActions();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "min-h-[100px] bg-background p-4 rounded shadow-xs border border-transparent",
        isDragging && "bg-sky-100 dark:bg-sky-800"
      )}
    >
      <div className="flex items-end justify-between">
        <Button
          onClick={() => {
            clickDetail(props.id);
          }}
          variant="link"
          className="!p-0 m-0 h-auto mb-0.5 text-foreground font-normal"
        >
          {props.title}
        </Button>
        <GripVerticalIcon
          {...listeners}
          {...attributes}
          className="cursor-grab w-4 text-muted-foreground"
        />
      </div>
      <p className="text-muted-foreground text-sm">{props.description}</p>
      <Separator className="my-2" />
      <p className="text-muted-foreground font-mono text-xs">
        #{props.id?.split("-")[0]}
      </p>
    </div>
  );
}
export default DraggableCard;
