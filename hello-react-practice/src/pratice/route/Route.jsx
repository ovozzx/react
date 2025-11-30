import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";

/**
 *
 * createBrowserRouter로 라우터 구조를 만들고, RouterProvider로 앱 전체에 적용.
 * Navigation 안에 <NavLink>로 메뉴를 만들고, 현재 활성 상태일 때 스타일 변경 가능.
 * <Outlet>이 있어야 children으로 정의한 페이지 컴포넌트가 렌더링됨.
 * 단순 이동은 <Link to="/about">About</Link>처럼 사용할 수 있음.
 */
// 1️⃣ 레이아웃 컴포넌트
function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
      >
        Home
      </NavLink>
      {" | "}
      <NavLink
        to="/about"
        style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
      >
        About
      </NavLink>
      <Link to="/Link">Link</Link>
      <hr />
      <Outlet /> {/* 자식 컴포넌트가 렌더링되는 위치 */}
    </nav>
  );
}

// 2️⃣ 페이지 컴포넌트
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

// 3️⃣ 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      // 중첩 라우트(nested route)
      // URL이 /이면 <Home /> 렌더링.
      // URL이 /about이면 <About /> 렌더링.
      // 중첩 라우트 안에서 부모 컴포넌트를 유지하면서 자식만 교체 가능
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

// 4️⃣ App
export default function RouteApp() {
  return <RouterProvider router={router} />;
}
