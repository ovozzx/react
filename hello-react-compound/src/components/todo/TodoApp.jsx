import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import TodoAppender from "./TodoAppender.jsx";
import {
  fetchAddTodo,
  fetchAllDoneTodo,
  fetchDoneTodo,
  fetchGetTodos,
} from "../../http/todo/todoFetch.js";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../store/redux/ReduxStore.jsx";
import { todoActions } from "../../store/toolkit/slices/todoSlice.js";

const randomValue = Math.random();

function TodoApp() {
  // taskReducer(state, action)에서 state 값이 아래 list로 들어옴
  // 아래 dispatcher에는
  console.log("--App.jsx 실행됨");
  // const [list, dispatcher] = useReducer(taskReducer, []); // 사용할 reduecer를 ()안에 적고, state에 넣어줄 기본값을 []에 적음
  const list = useSelector((store) => store.todos); // store 구독
  const dispatcher = useDispatch();
  const [random, setRandom] = useState(randomValue); // 갱신

  // 서버에서 todo List를 조회하고 list에 결과를 할당한다.
  // useEffect에는 동기 함수만 작성 가능하다는 규칙을 가짐
  useEffect(() => {
    // useEffect에서 비동기 함수 호출하는 방법!
    // 비동기 함수를 만들어서 호출.
    // 즉시 실행 함수로 생성해서 호출.
    (async () => {
      const todoList = await fetchGetTodos(); // await으로 원하는 데이터 받아오기
      console.log(todoList); // promise가 나옴
      // dispatcher({ type: actionTypes.TODO_INIT, payload: todoList }); // redux
      dispatcher(todoActions.init(todoList)); // toolkit으로 전환
    })(); // (함수)(파라미터)
  }, [random]); // 처음에만 동작하면 될 것 적어주기 [], random 값이 바뀌면 이함수도 동작

  const todoCount = useMemo(
    () => ({
      all: list.length,
      done: list.filter((item) => item.done).length,
      process: list.filter((item) => !item.done).length,
    }),
    [list] // list 바뀌었을때만 캐싱 다시해라
    // 비어있는 배열이면 처음실행할때만 동작
  );

  const onTodoAllDoneHandler = useCallback(
    async (event) => {
      // 처음에만 만들어서 넣고 바뀌지 말라는 뜻
      const isAllDone = event.currentTarget.checked;
      if (isAllDone) {
        await fetchAllDoneTodo();
        // console.log("~~~~", response);
        setRandom(Math.random());
        // dispatcher({
        //   type: actionTypes.TODO_ALL_DONE,
        // });
        dispatcher(todoActions.doneAll());
      }
    },
    [dispatcher]
  ); // [] => 의존배열

  const allDoneCheckBox = useMemo(
    () => (
      <input id="checkall" type="checkbox" onChange={onTodoAllDoneHandler} />
      // 캐싱하고 싶은 대상을 여기에 넣음
    ),
    [onTodoAllDoneHandler]
  );

  const onTodoDoneHandler = useCallback(
    async (todoId) => {
      const response = await fetchDoneTodo(todoId);
      console.log(response);
      setRandom(Math.random());
      // dispatcher({ type: actionTypes.TODO_DONE, payload: { id: todoId } });
      dispatcher(todoActions.done({ id: todoId })); // 안에 값이 payload에 들어감
    },
    [dispatcher]
  );

  const onTodoSaveHandler = useCallback(
    async (taskName, dueDate, priority) => {
      const addResult = await fetchAddTodo(taskName, dueDate, priority);
      setRandom(Math.random());
      // TodoAppender는 함수만 있고, 처음에만 생성되고 바뀌지 않도록 해놔서 재실행 안됨
      // dispatcher({
      //   type: actionTypes.TODO_ADD,
      //   payload: {
      //     // 서버가 보내준 데이터를 리액트에 추가! 서버는 id값 task_로 시작
      //     id: addResult.taskId,
      //     task: addResult.task,
      //     dueDate: addResult.dueDate,
      //     priority: addResult.priority,
      //   },
      // });
      dispatcher(
        todoActions.add({
          id: addResult.taskId,
          task: addResult.task,
          dueDate: addResult.dueDate,
          priority: addResult.priority,
        })
      );
    },
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

export default TodoApp;
