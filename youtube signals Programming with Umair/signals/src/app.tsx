import { Router } from "preact-router";
import "./app.css";
import UseHome from "./components/useState";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Todos } from "./components/Todos";
import { GlobalTodos } from "./components/GlobalTodos";
import { Theme } from "./components/Theme";

export function App() {
  return (
    <>
      <div id="app">
        <Navbar />
        <Router>
          <Home path="/" />
          <UseHome path="/useHome" />
          <Todos path="/todos" />
          <GlobalTodos path="/globalTodos" />
          <Theme path="/theme" />
        </Router>
      </div>
    </>
  );
}
