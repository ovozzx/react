import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CalcApp from "./components/calc/CalcApp.jsx";
// import PropsApp from "./components/PropsApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <PropsApp /> */}
    <CalcApp />
  </StrictMode>
);
