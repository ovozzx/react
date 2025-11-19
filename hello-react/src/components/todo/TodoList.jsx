import TodoHeader from "./TodoHeader.jsx";
import TodoItem from "./TodoItem.jsx";
import TodoAppender from "./TodoAppender.jsx";
import { useState } from "react";

export default function TodoList() {
  const [list, setList] = useState([
    {
      id: "todo_1",
      task: "Task 1",
      dueDate: "2024-12-31",
      priority: 1,
      done: false,
    },
    {
      id: "todo_2",
      task: "Task 2",
      dueDate: "2024-11-31",
      priority: 2,
      done: true,
    },
  ]);

  // 전체 체크
  const onCheckAllHandler = (event) => {
    console.log(event);
    console.log(event.target.checked);
    console.log(event.currentTarget.checked); // 이걸로 하면 에러남. 변수로 넣고 넣으니까 에러 안 남
    const isAllDone = event.currentTarget.checked;
    setList((prevList) => {
      const newList = prevList.map((item) => {
        return {
          ...item,
          done: isAllDone, // 체크박스 상태에 따라 모두 변경
        };
      });
      return newList;
    });
  };

  // event로 체크 대상 알 수 있음
  const onTodoDoneHandler = (todoId) => {
    // 기존 input에서 버튼으로 대상 바뀜
    // console.log(event.currentTarget.id);
    // console.dir(event.currentTarget);
    // const changeedId = event.currentTarget.id;

    // prevList = 직전의 리스트를 가져오겠다
    setList((prevList) => {
      // map으로 요소 반복
      const newList = prevList.map((item) => {
        if (item.id === todoId) {
          return {
            ...item, // 객체를 펼침
            done: !item.done, // 기존의 done 값 반대로 변경  ,
          };
        }
        return item; // 나머지 아이템들은 그대로 반환
      });
      return newList; // 최종 반환값으로 state 변경
    });
  };

  const onTodoSaveHandler = (taskName, dueDate, priority) => {
    // 파라미터는 appender에서 받아옴
    setList((prevList) => {
      const newList = [
        ...prevList,
        {
          task: taskName,
          dueDate,
          priority,
          id: `todo_${list.length + 1}`,
          done: false, // 새로 추가된 항목도 done 초기화 해줘야 함
        }, // 기존값에 새로운값 더해가는 형식
      ]; // 레퍼런스 타입. 메모리 구조를 끊어줘야 새로운 배열 나옴 -> 원래 배열을 풀어헤쳐서 새로운 배열을 만들겠다!
      return newList; // 반환된 값으로 state 바뀜
    }); // 최신 값을 가져와서 업데이트.
  };

  return (
    // 하나의 태그만 반환 가능해서 묶어줘야 함
    <>
      <ul className="tasks">
        <TodoHeader onAllDone={onCheckAllHandler} />
        {list.map(({ id, task, dueDate, priority, done }) => (
          <TodoItem
            key={id} // 예약어. 가져와서 쓰진 못함 (안쓰면 에러, 중복 불가)
            id={id}
            task={task}
            dueDate={dueDate}
            priority={priority}
            done={done}
            onDone={onTodoDoneHandler}
          />
        ))}
        {/* list 반복, item은 객체 1개 -> 구조 분해 */}
      </ul>
      <TodoAppender onSave={onTodoSaveHandler} />
    </>
  );
}
