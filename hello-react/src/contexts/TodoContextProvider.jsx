import { createContext, useReducer, useState } from "react";
import { TodoContext } from "./TodoContext";
import todoReducer, { actions } from "../reducers/todoReducer";

/**
 * 파편화되어있는 객체를 일괄 관리하겠다! todo나 다른 것들 등등
 */

// Context를 "배포"하는 컴포넌트 생성. ==> Provider

// Context를 배포하면, 멀리 떨어져있는 컴포넌트에서 "구독" 할 수 있다.

export default function TodoProvider({ children }) {
  const [list, dispatcher] = useReducer(todoReducer, []);
  // 배포 역할
  // state 기본값 객체 생성.
  const todoInitObject = {
    // 파편화 객체를 모음 => 추가로 showAlert: true, 등으로 관리하기 위해 배열 아닌 객체로 관리
    alertMessage: undefined,
    todoItems: [
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
    ],
  };

  // Context가 관리할 State 생성.
  const [todoItems, setTodoItems] = useState(todoInitObject);

  // Context의 State를 변경시킬 함수들 생성.
  const todoActions = {
    // 함수에 state 넣어줌 (여러개의 state 관리 가능)
    todo: todoItems,
    changeAlertMessage(message) {
      dispatcher({
        type: actions.changeAlertMessage,
        payload: { message: { message } },
      });
    },
    save(taskName, dueDate, priority) {
      dispatcher({
        type: actions.save,
        payload: {
          taskName,
          dueDate,
          priority,
        },
      });
    },
    done(todoId) {
      dispatcher({ type: actions.done, payload: { todoId } });
    },
    allDone(event) {
      const isAllDone = event.currentTarget.checked;
      dispatcher({ type: actions.allDone, payload: { done: isAllDone } });
    },
  };

  return (
    <TodoContext.Provider value={todoActions}>{children}</TodoContext.Provider>
  );

  // 이 컨텍스트를 배포하는 Provider가 된다!
}
