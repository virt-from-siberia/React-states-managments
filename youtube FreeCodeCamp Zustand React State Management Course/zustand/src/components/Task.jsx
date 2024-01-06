/* eslint-disable react/prop-types */
import classNames from "classnames";
import "./task.css";

const STATUS = "COMPLETED";

export const Task = ({ title }) => {
  return (
    <div className="task">
      <div>{title}</div>
      <div className="bottom-wrapper">
        <div></div>
        <div className={classNames("status", STATUS)}>{STATUS}</div>
      </div>
    </div>
  );
};
