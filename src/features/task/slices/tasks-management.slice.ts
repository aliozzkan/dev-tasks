import { createSlice } from "@reduxjs/toolkit/react";

type TaskManagementState = object;

const taskManagementSlice = createSlice({
  name: "taskManagement",
  initialState: {} as TaskManagementState,
  reducers: {},
  selectors: {},
});

export const taskManagementActions = taskManagementSlice.actions;
export const taskManagementSelectors = taskManagementSlice.selectors;
export const taskManagementReducer = taskManagementSlice.reducer;
