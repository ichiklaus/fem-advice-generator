import React from "react";
import { render } from "react-dom";
import { StrictMode } from "react/cjs/react.production.min";
import App from "./App.js";

const rootElement = document.getElementById("root");

render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
