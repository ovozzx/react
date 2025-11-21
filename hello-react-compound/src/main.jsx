import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CalcApp from "./components/calculator/CalcApp.jsx";
// import CartApp from "./components/cart/CartApp.jsx";
// import PropsApp from "./components/PropsApp.jsx";

console.log("main.jsx 실행됨");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <PropsApp /> */}
    {/* <CalcApp /> */}
    {/* <CartApp /> */}
  </StrictMode>
);
