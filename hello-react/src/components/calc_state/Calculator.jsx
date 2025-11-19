import { useState } from "react";

export default function Calculator({ onSave }) {
  const [a, setA] = useState(0);
  const [operator, setOperator] = useState("+");
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);

  const operatorChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    setOperator(event.currentTarget.value);
    // operator select 값 변경 시 실행될 로직
  };

  const onAInputChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    setA(parseInt(event.currentTarget.value));
    // a input 값 변경 시 실행될 로직
  };

  const onBInputChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    setB(parseInt(event.currentTarget.value));
    // B input 값 변경 시 실행될 로직
  };

  const onCalculateHandler = () => {
    // 계산하기 버튼 클릭 시 실행될 로직
    var rst = 0;
    if (operator === "+") {
      rst = a + b;
    } else if (operator === "-") {
      rst = a - b;
    } else if (operator === "*") {
      rst = a * b;
    } else if (operator === "/") {
      rst = a / b;
    }
    setResult(rst);
    onSave(a, b, operator, rst);
    console.log({ a, b, operator, rst });
  };
  return (
    <>
      <input id="a" type="number" onChange={onAInputChangeHandler}></input>
      <select onChange={operatorChangeHandler}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">x</option>
        <option value="/">/</option>
      </select>
      <input id="b" type="number" onChange={onBInputChangeHandler}></input>
      <button onClick={onCalculateHandler}>계산하기</button>
    </>
  );
}
