import { parseAsStringEnum, useQueryState } from "nuqs";

export const useViewState = () =>
  useQueryState(
    "view",
    parseAsStringEnum(["kanban", "table"]).withDefault("table")
  );

export const useTaskDetailIdState = () => useQueryState("task");

export const useManagementActions = () => {
  const [, setTaskDetailId] = useTaskDetailIdState();

  function clickDetail(id: string) {
    setTaskDetailId(id);
  }

  return {
    clickDetail,
  };
};
