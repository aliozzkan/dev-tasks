"use client";

import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TaskCreateDialog from "../components/task-create-dialog";
import TaskList, { ViewType } from "../components/task-list";
import {
  useTaskDetailIdState,
  useViewState,
} from "../hooks/use-management-state";
import TaskDetailDialog from "../components/task-detail-dialog";

function TaskManagementView() {
  const [view, setView] = useViewState();
  const [detailId] = useTaskDetailIdState();

  return (
    <div>
      <Card>
        <CardContent className="space-y-5">
          <div className="flex">
            <div className="ml-auto">
              <TaskCreateDialog />
            </div>
          </div>

          <div className="h-14 border border-dashed border-x-0 border-border w-full flex items-center gap-4 px-1">
            <Button
              variant="secondary"
              onClick={() => {
                setView("kanban");
              }}
            >
              {view === "kanban" && <CheckIcon className="w-4 h-4" />}
              Kanban
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setView("table");
              }}
            >
              {view === "table" && <CheckIcon className="w-4 h-4" />}
              Table
            </Button>
          </div>

          <TaskList view={view as ViewType} />
        </CardContent>
      </Card>

      {detailId && <TaskDetailDialog key={detailId} taskId={detailId} />}
    </div>
  );
}

export default TaskManagementView;
