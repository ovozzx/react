import { useState } from "react";
import Calculator from "./Calculator";
import CalcHistory from "./CalcHistory";

export default function CalApp() {
  const [a, setA] = useState();
  const [oper, setOper] = useState();
  const [b, setB] = useState();
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const [record, setRecord] = useState({});
  const [show, setShow] = useState(false);

  const onCalulatorHandler = (a, oper, b) => {
    // 파라미터 순서로 구분됨, 파라미터명은 상관 없음
    let rst = 0;
    if (oper == "+") rst = a + b;
    if (oper == "-") rst = a - b;
    if (oper == "x") rst = a * b;
    if (oper == "/") rst = a / b;

    setA(a);
    setOper(oper);
    setB(b);
    setResult(rst);

    setHistory((prevList) => {
      const newList = [
        { id: `${prevList.length + 1}`, a, oper, b, rst },
        ...prevList,
      ];
      return newList;
    });
  };

  const onClickModalHandler = (id) => {
    const record = history.find((item) => item.id == id);
    setRecord(record);
    console.log("클릭");
    setShow(true);
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

  return (
    <>
      <Calculator onGetHandler={onCalulatorHandler} />
      <CalcHistory history={history} onModal={onClickModalHandler} />
      <div style={modalStyle}>
        <section style={{ textAlign: "right" }} onClick={() => setShow(false)}>
          X
        </section>
        {record.a} {record.oper} {record.b} = {record.rst}
      </div>
    </>
  );
}
