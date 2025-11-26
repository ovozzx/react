import { createContext, useContext } from "react";
/**
 * 여러 컴포넌트를 조립하거나 안에 끼워 넣어 더 유연한 UI를 만드는 React 구조 설계 방식.
 * 즉, “부모가 자식 컴포넌트를 감싸서 조립해 쓰는 방식”.
 */
// 참조하려는 순간에는 반드시 정의가 끝나 있어야 한다
// 형제들 사이의 순서는 자유

const TaskListContext = createContext();

function TaskList({ children }) {
  return (
    <TaskListContext.Provider value="합성합성">
      <ul>{children}</ul>
    </TaskListContext.Provider>
  );
}

function TaskHeader() {
  const context = useContext(TaskListContext);
  // Provider가 없으면 “부모-자식 관계가 아니다”라고 판단 가능
  if (!context) throw new Error("위치 이상");
  return <li>Header {context}</li>;
}

function TaskItem() {
  const context = useContext(TaskListContext);
  if (!context) throw new Error("위치 이상");
  return <li>Item {context}</li>;
}

// ⬅️ 여기에서 TaskList에 속성으로 합성 컴포넌트를 붙인다
// TaskList를 먼저 선언한 후 속성을 붙여야 합니다.
TaskList.Header = TaskHeader;
TaskList.Item = TaskItem;

export default function CombineApp() {
  return (
    <TaskList>
      <TaskList.Header /> {/*children*/}
      <TaskList.Item /> {/*children*/}
      <TaskList.Item /> {/*children*/}
    </TaskList>
  );
}
