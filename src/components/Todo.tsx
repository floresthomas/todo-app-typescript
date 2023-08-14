import { TodoId, type Todo as TodoTypes } from "../types";

//Esta interfaz extiende las propiedades de todoTypes, es decir las hereda y ademas agrega una nueva propiedad
//la cual es onRemoveTodo
interface Props extends TodoTypes {
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({
    id,
    completed,
  }: Pick<TodoTypes, "id" | "completed">) => void;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleted,
}) => {
    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        onToggleCompleted({
            id,
            completed: event.target.checked
        })
    }
  return (
    <div className="view">
      <input
        className="toggle"
        checked={completed}
        type="checkbox"
        onChange={handleChangeCheckbox}
      />
      <label>{title}</label>
      <button
        className="destroy"
        onClick={() => {
          onRemoveTodo({ id });
        }}
      ></button>
    </div>
  );
};
