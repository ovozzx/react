import { useContext, useEffect, useRef, useState } from "react";
import Alert from "../ui/Modal.jsx";
import { TodoContext } from "../../contexts/TodoContext.jsx";

export default function TodoAppender() {
  console.log("TodoAppender 실행 됨!");

  const {
    save: onSave,
    todo: { alertMessage }, // 객체인 todo(todoItems)에서 alertMessage만 가져와라!
    changeAlertMessage: setAlertMessage,
  } = useContext(TodoContext);

  // const [alertMessage, setAlertMessage] = useState();
  const modalRef = useRef();
  const taskRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

  useEffect(() => {
    if (alertMessage) {
      modalRef.current.open();
    }
  }, [alertMessage]); // (함수, 배열)
  // 아무것도 입력 안하고 여러번 클릭했을 때, 모달 처음 한번만 뜸 (메세지 값이 안바뀌기 때문)

  // TodoAppendr가 관리하는 상태들
  // const [taskName, setTaskName] = useState();
  // const [dueDate, setDueDate] = useState();
  // const [priority, setPriority] = useState();

  const onAlertCloseHandler = () => {
    setAlertMessage(undefined);
    // 아무것도 입력 안하고 여러번 클릭했을 때, 모달 매번 뜨게하기 위함
  };

  const onButtonClickHandler = () => {
    console.log(modalRef);
    if (taskRef.current.value.trim() === "") {
      setAlertMessage("Todo명을 입력하세요.");
      // modalRef.current.showModal(); // 모달 표시
      return; // 함수 종료
    }

    if (dueDateRef.current.value.trim() === "") {
      setAlertMessage("기한을 선택하세요.");
      // modalRef.current.showModal(); // 모달 표시
      return; // 함수 종료
    }

    if (priorityRef.current.value.trim() === "") {
      setAlertMessage("우선순위를 선택하세요.");
      // modalRef.current.showModal(); // 모달 표시
      return; // 함수 종료
    }

    setAlertMessage(undefined); // 모달 안보여주기 위해 초기화 (안 적었다가 (오류) 적은 경우 (정상) dialog 없어지게 함)
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
      {alertMessage && (
        <Alert alertRef={modalRef} onClose={onAlertCloseHandler}>
          <div>
            <h3>{alertMessage}</h3>
          </div>
        </Alert>
      )}
      {/* 값이 있으면 true, 뒤에 컴포넌트를 주면 값이 있어서 무조건 true */}
    </footer>
  );
}
