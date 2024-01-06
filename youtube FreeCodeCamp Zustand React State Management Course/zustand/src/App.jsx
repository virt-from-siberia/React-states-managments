import { Column } from "./components/Column";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Column state="PLANNED" />
      <Column state="IN_PROGRESS" />
      <Column state="COMPLETED" />
    </div>
  );
}

export default App;
