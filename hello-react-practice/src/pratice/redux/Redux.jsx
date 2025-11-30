/**
 * Redux : 애플리케이션 상태(state)를 중앙에서 관리하고, 상태 변경을 예측 가능한 방식으로 처리하도록 도와주는 상태 관리 라이브러리
 * - 모든 state는 하나의 중앙 저장소(store)에서 관리
 * - state는 절대 직접 수정하지 않고, action → reducer → 새로운 state 순으로만 변경
 * Store: 상태를 담는 중앙 저장소
 * Action: 상태 변경 요청, { type, payload } 형태
 * Reducer: Action에 따라 상태를 변경하는 함수
 * Dispatch: Action을 store로 보내는 함수
 */

import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

// const initialState = { count: 0 };
// function counterReducer(state = initialState, action) {
//   if (action.type == "INCREMENT") {
//     // return { ...state, count: state.count + 1 }; 다른 상태 있으면, 기존 state를 유지해야 하니까 ...state가 필요
//     return { count: state.count + 1 };
//   }
//   return state;
// }

// const store = createStore(counterReducer);

// function Counter() {
//   const count = useSelector((state) => state.count); // 자동 구독
//   const value = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <h1>{count}</h1>
//       <button
//         onClick={() => {
//           dispatch({ type: "INCREMENT" });
//         }}
//       >
//         + (redux)
//       </button>
//     </div>
//   );
// }

// export default function CounterApp() {
//   return (
//     <>
//       <Provider store={store}>
//         <Counter />
//       </Provider>
//     </>
//   );
// }

/**
 * Redux Toolkit = slice로 state + "reducer" + action을 한 번에 만들고, configureStore로 간단하게 store 구성하는 Redux의 최신 표준 문법.
 */

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  // state는 들어오는 현재상태, 툴캇에서는 불변성 신경 쓰지 않고 수정 가능
  reducers: {
    increment: (state) => {
      state.value += 1; // return { ...state, value: state.value + 1 };와 같은 효과
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

const { increment, decrement } = counterSlice.actions;
// counterSlice.actions.increment와 counterSlice.actions.decrement를 각각 increment, decrement 변수로 꺼내서 바로 쓸 수 있게 함
// 구조 분해 할당 (객체 키 이름)

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    // todo: todoSlice.reducer,
  },
});

function Counter() {
  const value = useSelector((state) => state.counter.value); // state → Redux store 전체 상태를 의미, counterSlice 안의 value 속성을 가져옴
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default function CounterApp() {
  return (
    <>
      <Provider store={store}>
        <Counter />
      </Provider>
    </>
  );
}
