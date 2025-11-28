import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleApp from "../components/article/ArticleApp.jsx";
import CalcApp from "../components/calculator/CalcApp.jsx";
import CartApp from "../components/cart/CartApp.jsx";
import TodoApp from "../components/todo/TodoApp.jsx";
import PropsApp from "../components/PropsApp.jsx";
import UserContextProvider from "../contexts/UserContextProvider.jsx";
import MainLayout from "../components/layouts/MainLayout.jsx";
import PageNotFound from "../components/NotFound.jsx";
import { ArticleLayout } from "../components/layouts/ArticleLayout.jsx";
import { ArticleWrite } from "../components/article/ArticleWrite.jsx";
import ArticleDetail from "../components/article/ArticleDetail.jsx";

export default function AppRouter() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "",
          element: (
            <UserContextProvider>
              <ArticleLayout />
            </UserContextProvider>
          ),
          children: [
            { index: true, element: <ArticleApp /> }, // index: true => 대표 첫 페이지라는 뜻!
            { path: "write", element: <ArticleWrite /> },
            { path: "detail/:articleId", element: <ArticleDetail /> },
          ],
        },
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
