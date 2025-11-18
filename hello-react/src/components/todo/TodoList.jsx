import TodoHeader from "./TodoHeader.jsx";
import TodoItem from "./TodoItem.jsx";
import TodoAppender from "./TodoAppender.jsx";
import { useState } from "react";

export default function TodoList() {
  const [list, setList] = useState([
    { id: "todo_1", task: "Task 1", dueDate: "2024-12-31", priority: 1 },
    { id: "todo_2", task: "Task 2", dueDate: "2024-11-31", priority: 2 },
  ]);

  const onTodoSaveHandler = (taskName, dueDate, priority) => {
    // 파라미터는 appender에서 받아옴
    setList((prevList) => {
      const newList = [
        ...prevList,
        { task: taskName, dueDate, priority, id: `todo_${list.length + 1}` }, // 기존값에 새로운값 더해가는 형식
      ]; // 레퍼런스 타입. 메모리 구조를 끊어줘야 새로운 배열 나옴 -> 원래 배열을 풀어헤쳐서 새로운 배열을 만들겠다!
      return newList; // 반환된 값으로 state 바뀜
    }); // 최신 값을 가져와서 업데이트.
  };

  return (
    // 하나의 태그만 반환 가능해서 묶어줘야 함
    <>
      <ul className="tasks">
        <TodoHeader />
        {list.map(({ id, task, dueDate, priority }) => (
          <TodoItem
            key={id} // 예약어. 가져와서 쓰진 못함 (안쓰면 에러, 중복 불가)
            id={id}
            task={task}
            dueDate={dueDate}
            priority={priority}
          />
        ))}
        {/* list 반복, item은 객체 1개 -> 구조 분해 */}
      </ul>
      <TodoAppender onSave={onTodoSaveHandler} />
    </>
  );
}
