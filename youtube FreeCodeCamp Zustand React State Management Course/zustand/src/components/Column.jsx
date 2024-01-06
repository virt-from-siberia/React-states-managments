/* eslint-disable react/prop-types */
import { Task } from "./Task";
import "./column.css";

export const Column = ({ state }) => {
  return (
    <div className="column">
      {state}
      <Task title="Task 1" />
    </div>
  );
};
