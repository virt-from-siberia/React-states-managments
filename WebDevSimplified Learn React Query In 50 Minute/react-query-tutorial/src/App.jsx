import { useState } from "react";

import { PostsLists1 } from "./PostsLists1";
import { PostsLists2 } from "./PostsLists2";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsLists1 />);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsLists1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsLists2 />)}>
        Posts List 2
      </button>
      <br />
      {currentPage}
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default App;
