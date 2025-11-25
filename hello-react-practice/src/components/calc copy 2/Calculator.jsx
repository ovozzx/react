import { useRef } from "react";

export default function Calculator({ onCalc }) {
  const aRef = useRef(0);
  const operRef = useRef("+");
  const bRef = useRef(0);

  const onClickCalculate = () => {
    onCalc({ aRef, operRef, bRef });
  };

  return (
    <>
      <input ref={aRef} type="number"></input>
      <select ref={operRef}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="x">x</option>
        <option value="/">/</option>
      </select>
      <input ref={bRef} type="number"></input>
      <button onClick={onClickCalculate}> 계산하기 </button>
    </>
  );
}
