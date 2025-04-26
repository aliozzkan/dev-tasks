export interface IAddTaskVariables {
  title: string;
  description: string;
  userId: string;
}

export interface IUpdateTaskVariables {
  id: string;
  title?: string;
  description?: string;
  status?: number;
}
