/* eslint-disable react/prop-types */
import { useState } from "react";
import { useStore } from "../store";

import { Task } from "./Task";
import "./column.css";

export const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  console.log("tasks Columns", tasks);

  const addTask = useStore((store) => store.addTask);

  return (
    <div className="column">
      <div className="title-wrapper">
        <p> {state}</p>
        <button onClick={() => setOpen(true)}>add</button>
      </div>
      <button></button>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
