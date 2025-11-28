import { NavLink, Outlet } from "react-router-dom";
import UserContextProvider from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

// 이것도 함수라서 컴포넌트! export default 마지막에 추가해야함 (다른데서 쓸거면?)
export const ArticleLayout = () => {
  const { account, login } = useContext(UserContext);

  const token = localStorage.getItem("_token_");
  if (token && !account) {
    login();
  }
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
