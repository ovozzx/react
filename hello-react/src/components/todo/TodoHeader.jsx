import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";

export default function TodoHeader() {
  const { allDone } = useContext(TodoContext);

  return (
    <li className="tasks-header">
      <input id="checkall" type="checkbox" onChange={allDone} />
      <label>Task</label>
      <span className="due-date">Due date</span>
      <span className="priority">Priority</span>
    </li>
  );
}
