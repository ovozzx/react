import { useRef, useState } from "react";
import Alert from "../ui/Modal.jsx";

export default function CalcHistory({ calcHistory }) {
  const alertRef = useRef();
  const [result, setResult] = useState();

  const onItemClickHander = (event) => {
    console.log(event.currentTarget.innerText);
    setResult(event.currentTarget.innerText);
    alertRef.current.open();
  };

  return (
    <>
      <div>
        <div>계산이력</div>
        <ol>
          {calcHistory.map((historyItem, index) => (
            <li key={`historyItem_${index}`} onClick={onItemClickHander}>
              {historyItem}
            </li>
          ))}
        </ol>
      </div>
      <Alert alertRef={alertRef}>
        <div>{result}</div>
      </Alert>
    </>
  );
}
