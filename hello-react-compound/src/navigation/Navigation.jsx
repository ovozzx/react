import { Link, NavLink } from "react-router-dom";

// onClick => (navItem) => {setNavItem("article")}
export default function Navigation() {
  return (
    <nav className="menu-navigation">
      <ul>
        <li>
          {/* 현재 URL과 NavLink의 to 값이 일치하면 해당 컴포넌트 "active" 클래스를 적용시킨다 */}
          <NavLink to="/">Articles</NavLink>
        </li>
        <li>
          <NavLink to="/calculator">Calculator</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/todo">Todo</NavLink>
        </li>
        <li>
          <NavLink to="/prop">Prop</NavLink>
        </li>
        {/* 2개는 같은 방식. 여기서 첫번째는 무조건 this가 옴 */}
      </ul>
    </nav>
  );
}
