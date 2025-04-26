import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddTaskVariables } from "./task-api.types";

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
    getTasks: builder.query<void, void>({
      query: () => "/",
      providesTags: ["TaskList"],
    }),
  }),
});

export const { useAddTaskMutation, useGetTasksQuery } = taskApi;
export default taskApi;
