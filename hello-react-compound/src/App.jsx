import { useState } from "react";
import TodoApp from "./components/todo/TodoApp";
import Navigation from "./navigation/Navigation";
import ArticleApp from "./components/article/ArticleApp";

export default function App() {
  const [component, setComponent] = useState("TODO");
  // setComponent는 이미 캐싱되어있는 함수라서 또 캐싱할 필요 없음

  return (
    <div className="main-container">
      <header>
        <Navigation activeComponent={component} onClick={setComponent} />
      </header>
      {component === "TODO" && <TodoApp />}
      {component === "ARTICLE" && <ArticleApp />}
    </div>
  );
}
