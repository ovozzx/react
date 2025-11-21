import { useReducer, useState } from "react";
import CalcHistory from "./CalcHistory";
import Calculator from "./Calculator";
import taskReducer from "../../reducers/calculatorReducer";
import { actions } from "../../reducers/calculatorReducer";

export default function CalcApp() {
  const [list, dispatcher] = useReducer(taskReducer, []);
  // 여기사 list가 state

  const onCalculateHandler = (result) => {
    dispatcher({ type: actions.addHistory, payload: { result: result } });
    // setCalcHistory((prevCalcHistory) => [result, ...prevCalcHistory]);
  };

  console.log("CalcApp 렌더링 됨");

  return (
    <div>
      <Calculator onCalculate={onCalculateHandler} />
      <CalcHistory calcHistory={list} />
      {/* state인 list로 들어감 */}
    </div>
  );
}
