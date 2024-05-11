import { useTheme, useTodos } from "../store/useStore";

export const GlobalTodos = () => {
  const todoItems = useTodos();
  const theme = useTheme();

  const addTodo = (val: any) => {
    todoItems.value = [...todoItems.value, { text: val, completed: false }];
  };

  return (
    <>
      <button onClick={() => addTodo("global todo")}>Add todo</button>
      <ul>
        {todoItems.value.map((todo) => (
          <li
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onInput={() => {
                  todo.completed = !todo.completed;
                  todoItems.value = [...todoItems.value];
                }}
              />
              {todo.text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};
