import { createBrowserRouter } from "react-router-dom";
import ArticleApp from "../components/article/ArticleApp.jsx";
import CalcApp from "../components/calculator/CalcApp.jsx";
import CartApp from "../components/cart/CartApp.jsx";
import TodoApp from "../components/todo/TodoApp.jsx";
import PropsApp from "../components/PropsApp.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <ArticleApp />,
  },
  {
    path: "/calculator",
    element: <CalcApp />,
  },
  {
    path: "/cart",
    element: <CartApp />,
  },
  {
    path: "/todo",
    element: <TodoApp />,
  },
  {
    path: "/prop",
    element: <PropsApp />,
  },
]);
