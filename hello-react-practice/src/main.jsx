import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CalcApp from "./components/calc/CalcApp.jsx";
// import PropsApp from "./components/PropsApp.jsx";
import CartApp from "./components/cart/CartApp.jsx";
import Parent from "./pratice/useImperative/Parent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Parent />
  </StrictMode>
);
