/* eslint-disable react/prop-types */
import { shallow } from "zustand";
import { useStore } from "../store";

export const Temp = ({ state }) => {
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.status === state),
    shallow
  );

  return <div>Temp</div>;
};
