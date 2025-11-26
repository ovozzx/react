import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CalcApp from "./components/calculator/CalcApp.jsx";
import ReduxProvider from "./store/redux/ReduxStore.jsx";
// import CartApp from "./components/cart/CartApp.jsx";
// import PropsApp from "./components/PropsApp.jsx";

console.log("main.jsx 실행됨");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider>
      <App />
      {/* App이하에서 모두 store 접근 가능 */}
    </ReduxProvider>
    {/* <PropsApp /> */}
    {/* <CalcApp /> */}
    {/* <CartApp /> */}
  </StrictMode>
);
