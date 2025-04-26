import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "min-h-[100px] bg-background p-4 rounded shadow-xs border border-transparent cursor-grab",
        isDragging && "bg-sky-100 dark:bg-sky-800 cursor-grabbing"
      )}
    >
      <p>{props.title}</p>
      <p className="text-muted-foreground">{props.description}</p>
    </div>
  );
}
export default DraggableCard;
