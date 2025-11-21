// Dispatcher로 전달할 Action 정의
export const actions = {
  // 파라미터 action과 이름 다르게
  init: "INIT",
  add: "ADD",
  done: "DONE",
  allDone: "ALL-DONE",
};

// Reducer 생성
export default function taskReducer(state, action) {
  // 파라미터 이거 2개만 적어주면 reducer로 사용 가능
  // Reducer의 State를 관리 (추가/삭제/수정)가 목적

  // Action의 형태 ==> {type: "ADD", payload: value} 이름은 우리가 정함
  // dispatcher로 전달
  const type = action.type;
  const payload = action.payload;

  // type에 따라서 state를 변경하는 코드..
  if (type === actions.init) {
    return [...state, ...payload];
  } else if (type === actions.add) {
    const newList = [
      ...state, // prevList를 state로 씀
      {
        task: payload.taskName, // 객체 value는 payload.key 명으로 적어줌
        dueDate: payload.dueDate,
        priority: payload.priority,
        id: `todo_${state.length + 1}`,
        done: false,
      },
    ];
    return newList;
  } else if (type === actions.done) {
    // action => {type: "DONE", payload: {id: "todo_1"}}
    const newList = state.map((item) => {
      if (item.id === payload.id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    return newList;
  } else if (type === actions.allDone) {
    // action => {type: "ALL-DONE", payload: {done: true or false}}
    const newList = state.map((item) => {
      return { ...item, done: payload.done };
    });
    return newList;
  }

  // reducer 함수는 state를 반드시 반환
  // add, done, all-done 모두 아닐 때, 기존의 state를 반환
  // 새로운 메모리의 state가 아니기 때문에 state가 변경되었다고 판단하지 않는다!
  // state는 메모리 기준으로 변경되어야 변경되었다고 판단
  return state;
}
