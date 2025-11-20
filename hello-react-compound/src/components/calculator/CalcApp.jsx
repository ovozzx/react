import { useState } from "react";
import CalcHistory from "./CalcHistory";
import Calculator from "./Calculator";

export default function CalcApp() {
  const [calcHistory, setCalcHistory] = useState([]);
  const onCalculateHandler = (result) => {
    setCalcHistory((prevCalcHistory) => [result, ...prevCalcHistory]);
  };

  console.log("CalcApp 렌더링 됨");

  return (
    <div>
      <Calculator onCalculate={onCalculateHandler} />
      <CalcHistory calcHistory={calcHistory} />
    </div>
  );
}
