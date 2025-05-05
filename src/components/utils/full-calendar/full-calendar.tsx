import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { cn } from "@/lib/utils";
import { EventImpl } from "@fullcalendar/core/internal.js";

interface FullCalendarProps {
  events: EventSourceInput | undefined;
  onEventClick?: (event: EventImpl) => void;
}

function AppFullCalendar(props: FullCalendarProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      firstDay={1}
      viewClassNames="bg-background"
      dayCellClassNames="bg-background"
      eventClassNames={(event) => {
        return cn("!border-none !bg-muted", event.event.backgroundColor);
      }}
      headerToolbar={{
        left: "title",
        right: "prev next",
      }}
      events={props.events}
      eventClick={(arg) => {
        props.onEventClick?.(arg.event);
      }}
    />
  );
}

export default AppFullCalendar;
