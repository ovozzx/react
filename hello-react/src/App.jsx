import TodoList from "./components/todo/TodoList.jsx";

function App() {
  // 상수
  const 상수명 = "상수값";

  // 변수
  let 변수명 = "변수값";

  // 함수
  function 함수명() {
    // 함수 내용
  }

  // Fat Arrow Function
  const 화살표함수명 = () => {
    // 함수 내용
  };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <TodoList />
    </div>
  );
}

export default App;
