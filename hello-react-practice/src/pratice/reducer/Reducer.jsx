/**
 * reducer
 * 여러 상태 변경 로직을 하나의 함수로 모아
 * “현재 상태 + 명령(action)”을 기반으로 새로운 상태를 만들어내는 패턴.
 */

import { useReducer } from "react";

const actionType = {
  add: "ADD",
  sub: "SUB",
};

function myReducer(state, action) {
  // (현재상태, 액션) -> 이름은 상관 없고 순서가 중요
  // myReducer가 return한 값이 곧 다음 렌더링에서의 state 값이 됨 (set 함수 필요 없음)
  if (action.type == actionType.add) {
    return state + 1;
  } else if (action.type == actionType.sub) {
    return state - 1;
  }
  return state;
}

export default function Counter() {
  const [myState, myDispatcher] = useReducer(myReducer, 0); // (정의 함수, 첫 렌더링 때 사용할 초기 상태 값 (0, {}, []))
  // return 값 : [state, dispatch]
  // [렌더링할 때 최신 상태 값, 액션 발생 함수]
  // const [state, dispatch] = useReducer(reducer, 0);
  return (
    <>
      <div>{myState}</div>
      <button onClick={() => myDispatcher({ type: "ADD" })}>+</button>
      <button onClick={() => myDispatcher({ type: "SUB" })}>-</button>
      {/* dispatch는 상태를 변경하는 요청이므로, 렌더링 중에 발생하도록 하면 안됨 */}
    </>
  );
}
