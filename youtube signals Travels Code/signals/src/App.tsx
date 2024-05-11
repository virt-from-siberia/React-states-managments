import "./App.css";
import { signal, effect, computed } from "@preact/signals-react";

const count = signal(0);

const One = ({ data }) => {
  console.log("One rendered");
  return <Two data={data} />;
};

const Two = ({ data }) => {
  console.log("Two rendered");
  return <Three data={data} />;
};

const Three = ({ data }) => {
  console.log("Three rendered");
  return <p>{data}</p>;
};

function App() {
  effect(() => {
    if (count.value === 10) count.value = 0;
  });

  effect(() => {
    console.log(count.value);
  });

  const doubled = computed(() => count.value * 2);

  return (
    <>
      <p>{doubled}</p>
      <button onClick={() => count.value++}>Increace</button>
      <One data={count} />
    </>
  );
}

export default App;
