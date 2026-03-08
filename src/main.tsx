import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-phone-number-input/style.css";
import "./css/style.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
