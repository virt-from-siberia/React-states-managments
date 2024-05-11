import { useTheme } from "../store/useStore";
import { effect, signal } from "@preact/signals";

export const Theme = () => {
  const theme = useTheme();

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  const x = signal(1000);

  setInterval(() => {
    x.value *= 2;
  }, 1000);
  console.log("x", x.value);

  effect(() => {
    console.log("we are in effect", x.value);
  });

  return (
    <div style={{ margin: "100px" }}>
      <h1>Current Theme: {theme.value}</h1>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
};
