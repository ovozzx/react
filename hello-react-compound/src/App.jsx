import { useState, useRef } from "react";
import TodoList from "./components/todo/TodoList.jsx";
import TodoAppender from "./components/todo/TodoAppender.jsx";

function App() {
  const [list, setList] = useState([
    {
      id: "todo_1",
      task: "Task 1",
      dueDate: "2025-12-31",
      priority: 1,
      done: false,
    },
    {
      id: "todo_2",
      task: "Task 2",
      dueDate: "2025-11-31",
      priority: 2,
      done: true,
    },
  ]);

  const onTodoAllDoneHandler = (event) => {
    const isAllDone = event.currentTarget.checked;

    setList((prevList) => {
      const newList = prevList.map((item) => {
        return { ...item, done: isAllDone };
      });
      return newList;
    });
  };

  const onTodoDoneHandler = (todoId) => {
    setList((prevList) => {
      const newList = prevList.map((item) => {
        if (item.id === todoId) {
          return { ...item, done: !item.done };
        }
        return item;
      });
      return newList;
    });
  };

  const onTodoSaveHandler = (taskName, dueDate, priority) => {
    setList((prevList) => {
      const newList = [
        ...prevList,
        {
          task: taskName,
          dueDate,
          priority,
          id: `todo_${prevList.length + 1}`,
          done: false,
        },
      ];

      return newList;
    });
  };

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
        <TodoList.Header>
          <input
            id="checkall"
            type="checkbox"
            onChange={onTodoAllDoneHandler}
          />
        </TodoList.Header>
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
        ))}
      </TodoList>
      <TodoAppender onSave={onTodoSaveHandler} />
    </div>
  );
}

export default App;
