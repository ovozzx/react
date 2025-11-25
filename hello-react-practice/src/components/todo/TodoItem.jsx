import { TodoContext } from "../../contexts/TodoContext";
import { Confirm } from "../ui/Modal";
import { useContext, useEffect, useRef, useState } from "react";

export default function TodoItem({ id, task, dueDate, priority, done }) {
  const { done: onDone } = useContext(TodoContext);
  // done:onDone => 이름을 뒤에걸로 바꾼다!
  const confirmRef = useRef();
  const [showConfirm, setShowConfirm] = useState(false); // 기본값 false라서 modal 처음부터 안 나올 것

  useEffect(() => {
    if (showConfirm) {
      confirmRef.current.open();
    }
    // else {
    //   confirmRef.current.close(); Confirm 안 만들어지면 undefined라서 오류남
    // }
  }, [showConfirm]); // showConfirm이 바뀌면 동작!

  const onShowConfirmHandler = () => {
    setShowConfirm(true);
  };
  const onClickConfirmHandler = () => {
    onDone(id); // 컨텍스트의 done이 실행됨
    setShowConfirm(false);
  };
  const onClickConfirmCancleHandler = () => {
    // cancale 누르면 안 나오도록 함
    setShowConfirm(false);
  };

  return (
    <>
      <li className="task-item">
        <input
          id={id}
          type="checkbox"
          checked={done}
          onChange={onShowConfirmHandler}
        />
        {/* 체크박스 바뀌면 onDone 실행 (onTodoDoneHandler) */}
        <label htmlFor={id} className={`${done ? "done-todo" : ""}`}>
          {/* `` {}로 감싸기 */}
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
          onClickOK={onClickConfirmHandler}
          onClickCancle={onClickConfirmCancleHandler}
        >
          <div>
            {task}를{" "}
            {done ? "진행중으로 변경하시겠습니까?" : "완료하시겠습니까?"}
          </div>
        </Confirm>
      )}
      {/* showConfirm가 false이면 뒤에 Confirm 안 만들어짐 (&&에서 앞에 것이 false면 뒤에 안 보기때문) */}
    </>
  );
}
