import { useRef } from "react";

export default function CalcHistory({ history, onModal }) {
  console.log(history);

  const liIdRef = useRef(0);

  const onClickModalHandler = (id) => {
    onModal(id);
  };

  return (
    <>
      <ol style={{ display: history.length == 0 ? "none" : "block" }}>
        {history.map(({ id, a, oper, b, rst }) => (
          <li key={id} ref={liIdRef} onClick={() => onClickModalHandler(id)}>
            {a} {oper} {b} = {rst}
          </li>
        ))}
      </ol>
    </>
  );
}
