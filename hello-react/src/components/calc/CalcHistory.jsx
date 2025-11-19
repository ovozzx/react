import { useRef } from "react";
import CalModal from "./CalModal";

export default function CalcHistory({ history }) {
  console.log("계산이력 ", history);
  const clickRef = useRef();

  const onClickHistoryHandler = () => {
    clickRef.current.open();
  };

  return (
    <>
      <ol className="calc-history">
        계산이력
        {history.map(({ a, b, operator, result, id }) => (
          <li key={id} onClick={onClickHistoryHandler}>
            {a} {operator} {b} = {result}
          </li>
        ))}
      </ol>
      <CalModal clickRef={clickRef}>
        
        <CalModal/>
    </>
  );
}
