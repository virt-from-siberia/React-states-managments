import { signal } from "@preact/signals";

const count = signal(0);

const Home = () => {
  const increment = () => {
    count.value++;
  };

  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick={increment}>click me </button>
    </div>
  );
};

export default Home;
