import { useRef, useState } from "react";
import CalcHistory from "./CalcHistory";
import Calculator from "./Calculator";

export default function CalcApp() {
  const [a, setA] = useState();
  const [oper, setOper] = useState();
  const [b, setB] = useState();
  const [result, setResult] = useState();
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);

  const onCalculateHandler = (data) => {
    // state 비동기 현상으로 변수에 따라 넣어줘야 함
    let a = Number(data.aRef.current.value);
    let oper = data.operRef.current.value;
    let b = Number(data.bRef.current.value);

    var rst = 0;

    if (oper === "+") {
      rst = a + b;
    }
    if (oper === "-") {
      rst = a - b;
    }
    if (oper === "x") {
      rst = a * b;
    }
    if (oper === "/") {
      rst = a / b;
    }

    setA(a);
    setOper(oper);
    setB(b);
    setResult(rst);

    setHistory((prevList) => {
      const newHistory = [
        { id: `history_${prevList.length + 1}`, a, b, oper, rst },
        ...prevList,
      ];
      return newHistory;
    });
  };

  const modalStyle = {
    display: show ? "block" : "none",
    backgroundColor: "white",
    zIndex: "9999",
    position: "fixed",
    left: "85px",
    top: "44px",
    width: "200px",
    height: "87px",
    textAlign: "center",
    border: "1px solid #ccc",
    padding: "10px",
  };

  const onModalHandler = (id) => {
    // 자식에서 클릭하면 id에 맞는 값 띄우기
    for (const arr of history) {
      if (arr.id == id) {
        console.log(arr);
        setA(arr.a);
        setOper(arr.oper);
        setB(arr.b);
        setResult(arr.rst);
        setShow(true);
      }
    }
  };

  const onXClickHandler = () => {
    setShow(false);
  };

  return (
    <>
      <Calculator onCalc={onCalculateHandler} />
      <div>계산이력</div>
      <CalcHistory history={history} onModal={onModalHandler} />
      <div style={modalStyle}>
        <section onClick={onXClickHandler} style={{ textAlign: "right" }}>
          X
        </section>
        {a} {oper} {b} = {result}
      </div>
    </>
  );
}
