export default function CalcHistory({ history, onModal }) {
  return (
    <>
      {/* 괄호,, */}
      <ol>
        계산이력
        {history.map((item) => (
          <li key={item.id} onClick={() => onModal(item.id)}>
            {item.a} {item.oper} {item.b} = {item.rst}
          </li>
        ))}
      </ol>
    </>
  );
}
