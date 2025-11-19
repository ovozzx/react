import TodoList from "./components/todo/TodoList.jsx";
// import { useEffect, useRef, useState } from "react";
// import Alert from "./components/ui/Modal.jsx";

function App() {
  // const modalRef = useRef(); // Alert 내 dialog 묶음이 들어감

  // const onButtonClickHandler = () => {
  //   console.log(modalRef);
  //   modalRef.current.showModal(); // 모달 표시
  //   // setShowModal((prevState) => !prevState); // 모달 표시
  // };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <TodoList />
      {/* <button type="button" onClick={onButtonClickHandler}>
        Show Modal
      </button> */}
      {/* <Alert alertRef={modalRef}>
        <div>
          <h3>컴포넌트의 이름을 입력하세요</h3>
        </div>
      </Alert> */}
      {/* children으로 전달 => 싱글라인 태그 안됨 */}
    </div>
  );
}

export default App;
