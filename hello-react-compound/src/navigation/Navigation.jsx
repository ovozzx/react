// onClick => (navItem) => {setNavItem("article")}
export default function Navigation({ activeComponent, onClick }) {
  return (
    <nav className="menu-navigation">
      <ul>
        <li
          className={activeComponent === "TODO" ? "active" : ""}
          onClick={() => {
            onClick("TODO");
          }}
        >
          TODO
        </li>
        <li
          className={activeComponent === "ARTICLE" ? "active" : ""}
          onClick={onClick.bind(this, "ARTICLE")}
        >
          Articles
        </li>
        {/* 2개는 같은 방식. 여기서 첫번째는 무조건 this가 옴 */}
      </ul>
    </nav>
  );
}
