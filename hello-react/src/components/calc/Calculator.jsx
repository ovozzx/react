import { useState } from "react";

export default function Calculator({ onGetHandler }) {
  const [a, setA] = useState(0);
  const [oper, setOper] = useState("+");
  const [b, setB] = useState(0);

  const onBtnClickHandler = () => {
    onGetHandler(Number(a), oper, Number(b));
  };

  return (
    <>
      <input
        type="number"
        onChange={(event) => setA(event.target.value)}
      ></input>
      <select onChange={(event) => setOper(event.target.value)}>
        <option val="+">+</option>
        <option val="-">-</option>
        <option val="x">x</option>
        <option val="/">/</option>
      </select>
      <input
        type="number"
        onChange={(event) => setB(event.target.value)}
      ></input>
      <button onClick={onBtnClickHandler}>계산하기</button>
    </>
  );
}
