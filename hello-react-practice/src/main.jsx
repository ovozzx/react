import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CalcApp from "./components/calc/CalcApp.jsx";
// import PropsApp from "./components/PropsApp.jsx";
import CartApp from "./components/cart/CartApp.jsx";
import Parent from "./pratice/useImperative/Parent.jsx";
import Portal from "./pratice/portals/Portal.jsx";
import ContextApp from "./pratice/context/ContextApp.jsx";
import CombineApp from "./pratice/combine/child.jsx";
import Counter from "./pratice/reducer/Reducer.jsx";
import MemoApp from "./pratice/memo/Memo.jsx";
import CounterApp from "./pratice/redux/redux.jsx";
import RouteApp from "./pratice/route/Route.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Parent />
    <ContextApp />
    <CombineApp />
    <Counter />
    <MemoApp />
    {/* <CallbackApp /> */}
    <CounterApp />
    <RouteApp />

    <Portal />
    {/* <Portal /> 이렇게 호출하거나 부모를 호출! */}
  </StrictMode>
);
