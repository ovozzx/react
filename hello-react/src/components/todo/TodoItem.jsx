export default function TodoItem({ id, task, dueDate, priority }) {
  return (
    <li className="task-item">
      <input id={id} type="checkbox" />
      <label htmlFor={id}>{task}</label>
      <span className="due-date">{dueDate}</span>
      <span className="priority">{priority}</span>
    </li>
  );
}
