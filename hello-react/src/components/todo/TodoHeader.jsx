export default function TodoHeader({ onAllDone }) {
  return (
    <li className="tasks-header">
      <input id="checkall" type="checkbox" onChange={onAllDone} />
      <label>Task</label>
      <span className="due-date">Due date</span>
      <span className="priority">Priority</span>
    </li>
  );
}
