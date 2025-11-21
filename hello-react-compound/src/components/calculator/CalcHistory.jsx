import { useRef, useState, useReducer } from "react";
import Alert from "../ui/Modal.jsx";
import taskReducer from "../../reducers/calculatorReducer";
import { actions } from "../../reducers/calculatorReducer";

export default function CalcHistory({ calcHistory }) {
  const alertRef = useRef();
  const [result, setResult] = useState();
  // 여기는 굳이 reducer로 안 바꿔도 된다
  //const [message, dispatcher] = useReducer(taskReducer);
  const onItemClickHander = (event) => {
    console.log(event.currentTarget.innerText);

    // dispatcher({ type: actions.click, payload: event.currentTarget.innerText });
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
        {/* <div>{message}</div> */}
        <div>{result}</div>
      </Alert>
    </>
  );
}
