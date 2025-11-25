import { useState, useRef } from "react";

export default function Calculator({ onSave, aRef, operatorRef, bRef }) {
  const [result, setResult] = useState(0);

  const operatorChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    // setOperator(event.currentTarget.value);
    // operator select 값 변경 시 실행될 로직
  };

  const onAInputChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    // setA(parseInt(event.currentTarget.value));
    // a input 값 변경 시 실행될 로직
  };

  const onBInputChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    // setB(parseInt(event.currentTarget.value));
    // B input 값 변경 시 실행될 로직
  };

  const onCalculateHandler = () => {
    // 계산하기 버튼 클릭 시 실행될 로직
    var rst = 0;
    console.log({ aRef, bRef, operatorRef, rst });
    if (operatorRef.current.value === "+") {
      rst = aRef.current.value + bRef.current.value;
    } else if (operatorRef.current.value === "-") {
      rst = aRef.current.value - bRef.current.value;
    } else if (operatorRef.current.value === "*") {
      rst = aRef.current.value * bRef.current.value;
    } else if (operatorRef.current.value === "/") {
      rst = aRef.current.value / bRef.current.value;
    }
    setResult(rst);
    onSave(
      aRef.current.value,
      bRef.current.value,
      operatorRef.current.value,
      rst
    );
    console.log(
      "계산후 : ",
      aRef.current.value,
      bRef.current.value,
      operatorRef.current.value,
      result
    );
  };
  return (
    <>
      <input
        id="a"
        type="number"
        onChange={onAInputChangeHandler}
        ref={aRef}
      ></input>
      <select onChange={operatorChangeHandler} ref={operatorRef}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">x</option>
        <option value="/">/</option>
      </select>
      <input
        id="b"
        type="number"
        onChange={onBInputChangeHandler}
        ref={bRef}
      ></input>
      <button onClick={onCalculateHandler}>계산하기</button>
    </>
  );
}
