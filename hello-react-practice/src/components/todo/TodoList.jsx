import TodoHeader from "./TodoHeader.jsx";
import TodoItem from "./TodoItem.jsx";
import TodoAppender from "./TodoAppender.jsx";
import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext.jsx";

export default function TodoList() {
  // TodoContext 항목 구독!
  const { todo } = useContext(TodoContext);

  console.log(todo);
  // const [list, setList] = useState([
  //   {
  //     id: "todo_1",
  //     task: "Task 1",
  //     dueDate: "2024-12-31",
  //     priority: 1,
  //     done: false,
  //   },
  //   {
  //     id: "todo_2",
  //     task: "Task 2",
  //     dueDate: "2024-11-31",
  //     priority: 2,
  //     done: true,
  //   },
  // ]);

  const onTodoSaveHandler = (taskName, dueDate, priority) => {
    // 파라미터는 appender에서 받아옴
    // setList((prevList) => {
    //   const newList = [
    //     ...prevList,
    //     {
    //       task: taskName,
    //       dueDate,
    //       priority,
    //       id: `todo_${list.length + 1}`,
    //       done: false, // 새로 추가된 항목도 done 초기화 해줘야 함
    //     }, // 기존값에 새로운값 더해가는 형식
    //   ]; // 레퍼런스 타입. 메모리 구조를 끊어줘야 새로운 배열 나옴 -> 원래 배열을 풀어헤쳐서 새로운 배열을 만들겠다!
    //   return newList; // 반환된 값으로 state 바뀜
    // }); // 최신 값을 가져와서 업데이트.
  };

  return (
    // 하나의 태그만 반환 가능해서 묶어줘야 함
    <>
      <ul className="tasks">
        <TodoHeader />
        {todo.todoItems.map(({ id, task, dueDate, priority, done }) => (
          <TodoItem
            key={id} // 예약어. 가져와서 쓰진 못함 (안쓰면 에러, 중복 불가)
            id={id}
            task={task}
            dueDate={dueDate}
            priority={priority}
            done={done}
          />
        ))}
        {/* list 반복, item은 객체 1개 -> 구조 분해 */}
      </ul>
      <TodoAppender />
    </>
  );
}
