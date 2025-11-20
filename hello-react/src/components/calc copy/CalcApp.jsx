import Calculator from "./Calculator.jsx";
import CalcHistory from "./CalcHistory.jsx";
import { useState, useRef } from "react";

export default function CalcApp() {
  const [history, setHistory] = useState([]);
  const aRef = useRef();
  const operatorRef = useRef();
  const bRef = useRef();

  const onAddHistoryHandler = (a, b, operator, result) => {
    setHistory((prevHistory) => {
      const newHistory = [
        {
          a,
          b,
          operator,
          result,
          id: `history_${prevHistory.length + 1}`,
          done: false,
        },
        ...prevHistory,
      ];
      return newHistory;
    });
  };
  console.log(history);
  return (
    <>
      <Calculator
        aRef={aRef}
        operatorRef={operatorRef}
        bRef={bRef}
        onSave={onAddHistoryHandler}
      />
      <CalcHistory history={history} />
    </>
  );
}
