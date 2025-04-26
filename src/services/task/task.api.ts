import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddTaskVariables, IUpdateTaskVariables } from "./task-api.types";
import { InferResultType } from "@/types/db.types";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/task" }),
  tagTypes: ["TaskList"],
  endpoints: (builder) => ({
    addTask: builder.mutation<void, IAddTaskVariables>({
      query: (variables) => ({
        url: "/",
        method: "POST",
        body: variables,
      }),
      invalidatesTags: ["TaskList"],
    }),
    getTasks: builder.query<InferResultType<"tasks", { user: true }>[], void>({
      query: () => "/",
      providesTags: ["TaskList"],
    }),
    updateTask: builder.mutation<void, IUpdateTaskVariables>({
      query: (variables) => ({
        url: "/",
        method: "PATCH",
        body: variables,
      }),
      invalidatesTags: ["TaskList"],
    }),
  }),
});

export const { useAddTaskMutation, useLazyGetTasksQuery, useGetTasksQuery, useUpdateTaskMutation } =
  taskApi;
export default taskApi;
