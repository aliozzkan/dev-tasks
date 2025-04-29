import { taskManagementReducer } from "@/features/task/slices/tasks-management.slice";
import taskApi from "@/services/task/task.api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const REDUCERS = {
  taskManagement: taskManagementReducer,
};

const COMBINED_REDUCERS = combineReducers({
  ...REDUCERS,
  [taskApi.reducerPath]: taskApi.reducer,
});

// const persistedReducer = persistReducer(
//   {
//     key: "fortune",
//     version: 1,
//     storage,
//     whitelist: [],
//   },
//   COMBINED_REDUCERS
// );

export const makeStore = () =>
  configureStore({
    reducer: COMBINED_REDUCERS,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(taskApi.middleware),
    devTools: process.env.NODE_ENV === "development",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];