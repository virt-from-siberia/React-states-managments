import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import { store } from "./store";
import App from "./App";

import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
