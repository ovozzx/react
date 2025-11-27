import { memo, useEffect, useRef, useState } from "react";
import Alert from "../ui/Modal.jsx";
import { useDispatch } from "react-redux";
import { todoThunks } from "../../store/toolkit/slices/todoSlice.js";

// 코드 보기
// const isEmpty = (valueRef, message, setter) => {
//     return valueRef.current.value === "";
// };

export default memo(function TodoAppender() {
  console.log("-- -- TodoAppender 실행됨");

  const dispatcher = useDispatch();

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

  const isEmpty = (valueRef) => {
    return valueRef.current.value === "";
  }; // 이 함수로 하위 여러개에 모두 전달된다고 생각하면....
  // => (1) ref에 넣기, (2) 컴포넌트 내부보다 컴포넌트 외부에 있으면 됨 (한번 만들어진걸로 쭉 씀, 메모리 안바뀜)
  // useCallback보다 빠름 (메모리 바뀌었는지 체크하느라 성능 하락)

  const onButtonClickHandler = () => {
    if (isEmpty(taskRef)) {
      // isEmpty(taskRef, "Todo명을 입력하세요.", setAlertMessage)
      setAlertMessage("Todo명을 입력하세요.");
      return;
    }

    if (isEmpty(dueDateRef)) {
      setAlertMessage("기한을 선택하세요.");
      return;
    }

    if (isEmpty(priorityRef)) {
      setAlertMessage("우선순위를 선택하세요.");
      return;
    }

    setAlertMessage(undefined);

    dispatcher(
      todoThunks.add(
        taskRef.current.value,
        dueDateRef.current.value,
        priorityRef.current.value
      )
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
});
