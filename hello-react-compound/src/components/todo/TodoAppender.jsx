import { useEffect, useRef, useState } from "react";
import Alert from "../ui/Modal.jsx";

export default function TodoAppender({ onSave }) {
  console.log("TodoAppender 실행 됨!");

  const [alertMessage, setAlertMessage] = useState();

  const modalRef = useRef();

  const taskRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

  useEffect(() => {
    if (alertMessage) {
      modalRef.current.open();
    }
  }, [alertMessage]);

  const onAlertCloseHandler = () => {
    setAlertMessage(undefined);
  };

  const onButtonClickHandler = () => {
    if (taskRef.current.value === "") {
      setAlertMessage("Todo명을 입력하세요.");
      return;
    }

    if (dueDateRef.current.value === "") {
      setAlertMessage("기한을 선택하세요.");
      return;
    }

    if (priorityRef.current.value === "") {
      setAlertMessage("우선순위를 선택하세요.");
      return;
    }

    setAlertMessage(undefined);

    onSave(
      taskRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value
    );

    taskRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "1";
  };

  return (
    <footer>
      <input type="text" placeholder="New Task..." ref={taskRef} />
      <input type="date" ref={dueDateRef} />
      <select ref={priorityRef}>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onButtonClickHandler}>
        Save
      </button>
      {alertMessage && (
        <Alert alertRef={modalRef} onClose={onAlertCloseHandler}>
          <div>{alertMessage}</div>
        </Alert>
      )}
    </footer>
  );
}
