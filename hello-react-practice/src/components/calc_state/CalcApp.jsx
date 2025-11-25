import Calculator from "./Calculator.jsx";
import CalcHistory from "./CalcHistory.jsx";
import { useState } from "react";

export default function CalcApp() {
  const [history, setHistory] = useState([]);

  const onAddHistoryHandler = (a, b, operator, result) => {
    setHistory((prevHistory) => {
      const newHistory = [
        { a, b, operator, result, id: `history_${prevHistory.length + 1}` },
        ...prevHistory,
      ];
      return newHistory;
    });
  };
  console.log(history);
  return (
    <>
      <Calculator onSave={onAddHistoryHandler} />
      <CalcHistory history={history} />
    </>
  );
}
