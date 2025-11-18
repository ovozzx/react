import { useState } from "react";

export default function TodoAppender({ onSave }) {
  // TodoAppendr가 관리하는 상태들
  const [taskName, setTaskName] = useState();
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState();

  const onButtonClickHandler = () => {
    alert("Todo 추가!");
    onSave(taskName, dueDate, priority); // 부모 컴포넌트로 값 전달
    setTaskName("");
    setDueDate("");
    setPriority(1);
  };

  const onTodoInputKeyUpHandler = (event) => {
    console.log(event.currentTarget.value);
    setTaskName(event.currentTarget.value); // 값 받아서 변경
  };

  const onPriorityChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    setPriority(event.currentTarget.value);
  };

  const onDueDateChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    setDueDate(event.currentTarget.value);
  };

  return (
    <footer>
      <input
        type="text"
        placeholder="Task"
        value={taskName}
        onChange={onTodoInputKeyUpHandler}
      />
      <input type="date" value={dueDate} onChange={onDueDateChangeHandler} />
      <select onChange={onPriorityChangeHandler} value={priority}>
        <option>우선순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onButtonClickHandler}>
        Save
      </button>
    </footer>
  );
}
