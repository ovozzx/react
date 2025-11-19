import { useRef, useState } from "react";
import Alert from "../ui/Modal.jsx";

export default function TodoAppender({ onSave }) {
  console.log("TodoAppender 실행 됨!");

  const [alertMessage, setAlertMessage] = useState();
  const modalRef = useRef();
  const taskRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();
  // TodoAppendr가 관리하는 상태들
  // const [taskName, setTaskName] = useState();
  // const [dueDate, setDueDate] = useState();
  // const [priority, setPriority] = useState();

  const onButtonClickHandler = () => {
    console.log(modalRef);
    if (taskRef.current.value.trim() === "") {
      setAlertMessage("Todo명을 입력하세요.");
      // modalRef.current.showModal(); // 모달 표시
      modalRef.current.open();
      return; // 함수 종료
    }

    if (dueDateRef.current.value.trim() === "") {
      setAlertMessage("기한을 선택하세요.");
      // modalRef.current.showModal(); // 모달 표시
      modalRef.current.open();
      return; // 함수 종료
    }

    if (priorityRef.current.value.trim() === "") {
      setAlertMessage("우선순위를 선택하세요.");
      // modalRef.current.showModal(); // 모달 표시
      modalRef.current.open();
      return; // 함수 종료
    }
    // onSave(taskName, dueDate, priority); // 부모 컴포넌트로 값 전달
    // setTaskName("");
    // setDueDate("");
    // setPriority(1);
    onSave(
      taskRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value
    ); // 부모 컴포넌트로 값 전달
    taskRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "1";
    // 이렇게 하면 값이 바뀌어도 리렌더링이 안 됨
  };

  // const onTodoInputKeyUpHandler = (event) => {
  //   console.log(event.currentTarget.value);
  //   setTaskName(event.currentTarget.value); // 값 받아서 변경
  // };

  // const onPriorityChangeHandler = (event) => {
  //   console.log(event.currentTarget.value);
  //   setPriority(event.currentTarget.value);
  // };

  // const onDueDateChangeHandler = (event) => {
  //   console.log(event.currentTarget.value);
  //   setDueDate(event.currentTarget.value);
  // };

  return (
    <footer>
      <input
        type="text"
        placeholder="Task"
        // value={taskName}
        // onChange={onTodoInputKeyUpHandler}
        ref={taskRef}
      />
      <input
        type="date"
        //  value={dueDate} onChange={onDueDateChangeHandler}
        ref={dueDateRef}
      />
      <select
        // onChange={onPriorityChangeHandler} value={priority}
        ref={priorityRef}
      >
        <option value="">우선순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onButtonClickHandler}>
        Save
      </button>
      <Alert alertRef={modalRef}>
        <div>
          <h3>{alertMessage}</h3>
        </div>
      </Alert>
    </footer>
  );
}
