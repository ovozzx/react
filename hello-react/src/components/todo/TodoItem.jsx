import { Confirm } from "../ui/Modal";
import { useRef } from "react";

export default function TodoItem({
  id,
  task,
  dueDate,
  priority,
  done,
  onDone,
}) {
  const confirmRef = useRef();
  const onShowConfirmHandler = () => {
    confirmRef.current.open();
  };
  const onClickConfirmHandler = () => {
    onDone(id);
    confirmRef.current.close(); // 왜 추가 안해도 닫히는가
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
      <Confirm confirmRef={confirmRef} onClickOK={onClickConfirmHandler}>
        <div>
          {task}를 {done ? "진행중으로 변경하시겠습니까?" : "완료하시겠습니까?"}
        </div>
      </Confirm>
    </>
  );
}
