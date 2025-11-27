import { useState, useRef, useMemo, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import TodoAppender from "./TodoAppender.jsx";
import { useDispatch, useSelector } from "react-redux";
import { todoThunks } from "../../store/toolkit/slices/todoSlice.js";

function TodoApp() {
  // taskReducer(state, action)에서 state 값이 아래 list로 들어옴
  // 아래 dispatcher에는
  console.log("--App.jsx 실행됨");
  // const [list, dispatcher] = useReducer(taskReducer, []); // 사용할 reduecer를 ()안에 적고, state에 넣어줄 기본값을 []에 적음
  const list = useSelector((store) => store.todos); // store 구독
  console.log("구독 : ", list);
  const dispatcher = useDispatch();

  // 서버에서 todo List를 조회하고 list에 결과를 할당한다.
  // useEffect에는 동기 함수만 작성 가능하다는 규칙을 가짐
  useEffect(() => {
    dispatcher(todoThunks.init()); // 내부에서 여러 함수들 동작
  }, [dispatcher]); // 처음에만 동작하면 될 것 적어주기 [], random 값이 바뀌면 이함수도 동작

  const todoCount = useMemo(
    () => ({
      all: list.length,
      done: list.filter((item) => item.done).length,
      process: list.filter((item) => !item.done).length,
    }),
    [list] // list 바뀌었을때만 캐싱 다시해라
    // 비어있는 배열이면 처음실행할때만 동작
  );

  const allDoneCheckBox = useMemo(
    () => (
      <input
        id="checkall"
        type="checkbox"
        onChange={(event) => {
          dispatcher(todoThunks.doneAll(event));
        }}
      />
      // 캐싱하고 싶은 대상을 여기에 넣음
    ),
    [dispatcher]
  );

  const [alertMessage, setAlertMessage] = useState();

  const modalRef = useRef();

  const taskRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

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

    taskRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "1";
  };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <TodoList>
        <TodoList.Header count={todoCount}>{allDoneCheckBox}</TodoList.Header>
        {/* 이름 자체가 todolist 내부에 쓰게하자는 규칙 */}
        {list.map(({ id, task, dueDate, priority, done }) => (
          <TodoList.Item
            key={id}
            id={id}
            task={task}
            dueDate={dueDate}
            priority={priority}
            done={done}
          />
          // id, task, ... onDone 중에 1개라도 바뀌면 재실행.
          // 여기서 함수만 레퍼런스 onDone만 캐싱
        ))}
      </TodoList>
      <TodoAppender />
    </div>
  );
}

export default TodoApp;
