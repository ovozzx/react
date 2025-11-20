import { useRef } from "react";

export default function Calculator({ onCalculate }) {
  const firstRef = useRef();
  const secondRef = useRef();
  const operRef = useRef();

  const onButtonClickHandler = () => {
    let result = 0;
    const oper = operRef.current.value;
    const firstNumber = parseInt(firstRef.current.value);
    const secondNumber = parseInt(secondRef.current.value);

    if (oper === "+") {
      result = firstNumber + secondNumber;
    } else if (oper === "-") {
      result = firstNumber - secondNumber;
    } else if (oper === "*") {
      result = firstNumber * secondNumber;
    } else if (oper === "/") {
      result = firstNumber / secondNumber;
    }
    onCalculate(`${firstNumber} ${oper} ${secondNumber} = ${result}`);
    firstRef.current.value = 0;
    secondRef.current.value = 0;
    operRef.current.value = "+";
  };
  return (
    <div>
      <input type="number" ref={firstRef} />
      <select ref={operRef}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" ref={secondRef} />
      <button type="button" onClick={onButtonClickHandler}>
        계산하기
      </button>
    </div>
  );
}
