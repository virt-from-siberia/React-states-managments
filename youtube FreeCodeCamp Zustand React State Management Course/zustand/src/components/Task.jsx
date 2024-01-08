/* eslint-disable react/prop-types */
import classNames from "classnames";
import { useStore } from "../store";
import "./task.css";

export const Task = ({ title }) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div className="task">
      <div>{task.title}</div>
      <div className="bottom-wrapper">
        <div className="delete" onClick={() => deleteTask(title)}>
          delete
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
};
