import { signal, computed } from "@preact/signals";
import "preact/debug";

const todos = signal([
  { text: "global todo 1", completed: true },
  { text: "global todo 2", completed: false },
  { text: "global todo 3", completed: false },
]);

const text = signal("");

export const Todos = () => {
  const onInput = (event: any) => (text.value = event.target.value);

  const addTodo = () => {
    todos.value = [...todos.value, { text: text.value, completed: false }];
    text.value = "";
  };

  const removeTodo = (todo: any) => () => {
    todos.value = todos.value.filter((t) => t !== todo);
  };

  const completedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed).length;
  });

  return (
    <div style={{ marginTop: "25px" }}>
      <p>Complied : {completedTodos.value}</p>
      <input
        type="text"
        value={text.value}
        onInput={onInput}
        style={{ height: "30px", marginRight: "10px" }}
      />

      <button onClick={addTodo}>Add todo</button>
      <ul>
        {todos.value.map((todo) => (
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
                  todos.value = [...todos.value];
                }}
              />
              {todo.text}
            </label>

            <button style={{ marginLeft: "15px" }} onClick={removeTodo(todo)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
