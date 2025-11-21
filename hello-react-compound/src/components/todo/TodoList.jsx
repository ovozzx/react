import {
  createContext,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Confirm } from "../ui/Modal";

const TodoListContext = createContext();

export default function TodoList({ children }) {
  console.log("-- -- TodoList.jsx 실행됨");
  const contextAction = { componentName: "TodoList" };

  return (
    <TodoListContext.Provider value={contextAction}>
      <ul className="tasks">{children}</ul>
    </TodoListContext.Provider>
  );
}

TodoList.Header = memo(function TodoListHeader({ count, children }) {
  //
  // children이 바뀌지 않는 이상, Header는 재실행 안됨
  console.log("-- -- -- TodoList.Header 실행됨");
  const context = useContext(TodoListContext); // 있으면 재실행됨 memo 무시

  if (!context) {
    // throw new Error("Header가 잘못된 위치에서 사용되었습니다."); // 페이지 자체가 안 나옴
    return <li>잘못된 사용 방법입니다.</li>; // 페이지는 나오게, 헤더에 에러 출력
  }

  return (
    <>
      <li className="tasks-counter">
        <div>전체 {count.all} 개</div>
        <div>완료 {count.done} 개</div>
        <div>진행중 {count.process} 개</div>
      </li>
      <li className="task-header">
        {children}
        <label htmlFor="checkall">Task</label>
        <span className="due-date">Due Date</span>
        <span className="priority">Priority</span>
      </li>
    </>
  );
});

TodoList.Item = memo(function TodoItem({
  id,
  task,
  dueDate,
  priority,
  done,
  onDone,
}) {
  console.log("-- -- -- TodoList.Item 실행됨");
  const confirmRef = useRef();

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (showConfirm) {
      confirmRef.current.open();
    }
  }, [showConfirm]);

  const onShowConfirmHandler = () => {
    setShowConfirm(true);
  };

  const onClickConfirmOkHandler = () => {
    onDone(id);
    setShowConfirm(false);
  };

  const onClickConfirmCancelHandler = () => {
    setShowConfirm(false);
  };

  // const context = useContext(TodoListContext);

  // if (!context) {
  //   // throw new Error("Item 잘못된 위치에서 사용되었습니다."); // 페이지 자체가 안 나옴
  //   return <li>잘못된 사용 방법입니다.</li>; // 페이지는 나오게, 헤더에 에러 출력
  // }

  return (
    <>
      <li className="task-item">
        <input
          id={id}
          type="checkbox"
          checked={done}
          onChange={onShowConfirmHandler}
        />
        <label htmlFor={id} className={`${done ? "done-todo" : ""}`}>
          {task}
        </label>
        <span className={`due-date ${done ? "done-todo" : ""}`}>{dueDate}</span>
        <span className={`priority ${done ? "done-todo" : ""}`}>
          {priority}
        </span>
      </li>
      {showConfirm && (
        <Confirm
          confirmRef={confirmRef}
          onClickOk={onClickConfirmOkHandler}
          onClickCancel={onClickConfirmCancelHandler}
        >
          <div>
            {task}를{" "}
            {done ? "진행중으로 변경하시겠습니까?" : "완료하시겠습니까?"}
          </div>
        </Confirm>
      )}
    </>
  );
});
