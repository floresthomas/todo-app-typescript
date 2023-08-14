import { useState } from "react";
import { Todos } from "./components/Todos";
import {
  FilterValue,
  TodoId,
  TodoTitle,
  type Todo as TodoTypes,
} from "./types";
import { TODO_FILTER } from "./components/consts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const mockTodos = [
  {
    id: "1",
    title: "Aprender react con typescript",
    completed: false,
  },
  {
    id: "2",
    title: "Aprender ingles",
    completed: false,
  },
  {
    id: "3",
    title: "Hacer un todo con typescript solo",
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTER.ALL
  );

  const handleRemove = ({ id }: TodoId): void => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoTypes, "id" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleFilter = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTER.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTER.COMPLETED) return todo.completed;
    return todo;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        todos={filteredTodos}
        onToggleCompleted={handleCompleted}
        onRemoveTodo={handleRemove}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilter}
      />
    </div>
  );
};

export default App;
