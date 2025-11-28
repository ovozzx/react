import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleApp from "../components/article/ArticleApp.jsx";
import CalcApp from "../components/calculator/CalcApp.jsx";
import CartApp from "../components/cart/CartApp.jsx";
import TodoApp from "../components/todo/TodoApp.jsx";
import PropsApp from "../components/PropsApp.jsx";
import UserContextProvider from "../contexts/UserContextProvider.jsx";
import MainLayout from "../components/layouts/MainLayout.jsx";
import PageNotFound from "../components/NotFound.jsx";

export default function AppRouter() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserContextProvider>
          <MainLayout />
        </UserContextProvider>
      ),
      errorElement: <PageNotFound />,
      children: [
        { path: "", element: <ArticleApp /> },
        { path: "calculator", element: <CalcApp /> },
        { path: "cart", element: <CartApp /> },
        { path: "todo", element: <TodoApp /> },
        { path: "prop", element: <PropsApp /> },
      ], // Outlet으로 대체
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
  return <RouterProvider router={routes} />;
}
