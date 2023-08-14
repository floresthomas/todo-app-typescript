import { TODO_FILTER } from "./components/consts";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoId = Pick<Todo, "id">;
export type TodoTitle = Pick<Todo, "title">;
export type TodoCompleted = Pick<Todo, "completed">;

export type ListOfTodos = Todo[];

export type FilterValue = typeof TODO_FILTER[keyof typeof TODO_FILTER]
