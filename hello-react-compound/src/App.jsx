import {
  useState,
  useRef,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import TodoList from "./components/todo/TodoList.jsx";
import TodoAppender from "./components/todo/TodoAppender.jsx";
import taskReducer, { actions } from "./reducers/todoReducer.js";

function App() {
  // taskReducer(state, action)에서 state 값이 아래 list로 들어옴
  // 아래 dispatcher에는
  console.log("--App.jsx 실행됨");
  const [list, dispatcher] = useReducer(taskReducer, []); // 사용할 reduecer를 ()안에 적고, state에 넣어줄 기본값을 []에 적음

  // 서버에서 todo List를 조회하고 list에 결과를 할당한다.
  const loadTodoList = async () => {
    const todoResponse = await fetch("http://localhost:8888/api/v1/task", {
      method: "get",
    }); // 브라우저 기능. method 없어도 default는 get
    console.log(todoResponse);
    const todoJson = await todoResponse.json();
    console.log(todoJson);

    const todoList = todoJson.body;
    dispatcher({ type: actions.init, payload: todoList }); // state 바뀌면 App() 컴포넌트 재실행
    // 컴포넌트디드마운트일때만 fetch해라
  };

  useEffect(() => {
    loadTodoList();
  }, []);

  const todoCount = useMemo(
    () => ({
      all: list.length,
      done: list.filter((item) => item.done).length,
      process: list.filter((item) => !item.done).length,
    }),
    [list] // list 바뀌었을때만 캐싱 다시해라
    // 비어있는 배열이면 처음실행할때만 동작
  );

  const onTodoAllDoneHandler = useCallback((event) => {
    // 처음에만 만들어서 넣고 바뀌지 말라는 뜻
    const isAllDone = event.currentTarget.checked;
    dispatcher({ type: actions.allDone, payload: { done: isAllDone } });
  }, []); // [] => 의존배열

  const allDoneCheckBox = useMemo(
    () => (
      <input id="checkall" type="checkbox" onChange={onTodoAllDoneHandler} />
      // 캐싱하고 싶은 대상을 여기에 넣음
    ),
    [] // 컴포넌트 처음에 만들어질 때
  );

  const onTodoDoneHandler = useCallback((todoId) => {
    dispatcher({ type: actions.done, payload: { id: todoId } });
  }, []);

  const onTodoSaveHandler = useCallback((taskName, dueDate, priority) => {
    // TodoAppender는 함수만 있고, 처음에만 생성되고 바뀌지 않도록 해놔서 재실행 안됨
    dispatcher({ type: actions.add, payload: { taskName, dueDate, priority } });
  }, []);

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

    onTodoSaveHandler(
      taskRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value
    );

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
            onDone={onTodoDoneHandler}
          />
          // id, task, ... onDone 중에 1개라도 바뀌면 재실행.
          // 여기서 함수만 레퍼런스 onDone만 캐싱
        ))}
      </TodoList>
      <TodoAppender onSave={onTodoSaveHandler} />
    </div>
  );
}

export default App;
