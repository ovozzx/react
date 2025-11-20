import { createContext, useState } from "react";
import { TodoContext } from "./TodoContext";

/**
 * 파편화되어있는 객체를 일괄 관리하겠다! todo나 다른 것들 등등
 */

// Context를 "배포"하는 컴포넌트 생성. ==> Provider

// Context를 배포하면, 멀리 떨어져있는 컴포넌트에서 "구독" 할 수 있다.

export default function TodoProvider({ children }) {
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
      setTodoItems((prevItem) => {
        return { ...prevItem, alertMessage: message };
      });
    },
    save(taskName, dueDate, priority) {
      setTodoItems((prevItem) => {
        const newList = [
          ...prevItem.todoItems,
          {
            task: taskName,
            dueDate,
            priority,
            id: `todo_${prevItem.todoItems.length + 1}`,
            done: false, // 새로 추가된 항목도 done 초기화 해줘야 함
          }, // 기존값에 새로운값 더해가는 형식
        ]; // 레퍼런스 타입. 메모리 구조를 끊어줘야 새로운 배열 나옴 -> 원래 배열을 풀어헤쳐서 새로운 배열을 만들겠다!
        return { ...prevItem, todoItems: newList }; // 반환된 값으로 state 바뀜
      }); // 최신 값을 가져와서 업데이트.
    },
    done(todoId) {
      setTodoItems((prevItem) => {
        // map으로 요소 반복
        const newList = prevItem.todoItems.map((item) => {
          if (item.id === todoId) {
            return {
              ...item, // 객체를 펼침
              done: !item.done, // 기존의 done 값 반대로 변경  ,
            };
          }
          return item; // 나머지 아이템들은 그대로 반환
        });
        return { ...prevItem, todoItems: newList }; // 최종 반환값으로 state 변경
      });
    },
    allDone(event) {
      const isAllDone = event.currentTarget.checked;
      setTodoItems((prevItem) => {
        const newList = prevItem.todoItems.map((item) => {
          return {
            ...item,
            done: isAllDone, // 체크박스 상태에 따라 모두 변경
          };
        });
        return { ...prevItem, todoItems: newList };
      });
    },
  };

  return (
    <TodoContext.Provider value={todoActions}>{children}</TodoContext.Provider>
  );

  // 이 컨텍스트를 배포하는 Provider가 된다!
}
