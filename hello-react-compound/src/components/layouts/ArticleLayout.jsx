import { NavLink, Outlet } from "react-router-dom";

// 이것도 함수라서 컴포넌트! export default 마지막에 추가해야함 (다른데서 쓸거면?)
export const ArticleLayout = () => {
  return (
    <>
      <div className="menu-navigation">
        <ul>
          <li>
            <NavLink to="/">List</NavLink>
          </li>
          <li>
            <NavLink to="/write">새 게시글 등록</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};
