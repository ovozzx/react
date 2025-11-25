// 4개의 action
export const actions = {
  changeAlertMessage: "CHANGE_ALERT_MESSAGE",
  save: "SAVE",
  done: "DONE",
  allDone: "ALL_DONE",
};

export default function todoReducer(state, action) {
  const type = action.type;
  const payload = action.payload;

  if (type === actions.changeAlertMessage) {
    // action : {type: "CHANGE_ALERT_MESSAGE", payload: {message: "adsdadas"}}
    // 기존 데이터는 state인듯 업데이트 값이 payload인듯
    return { ...state, alertMessage: payload.message };
  } else if (type === actions.save) {
    const newList = [
      ...state.todoItems,
      {
        task: payload.taskName,
        dueDate: payload.dueDate,
        priority: payload.priority,
        id: `todo_${state.todoItems.length + 1}`,
        done: false, // 새로 추가된 항목도 done 초기화 해줘야 함
      }, // 기존값에 새로운값 더해가는 형식
    ]; // 레퍼런스 타입. 메모리 구조를 끊어줘야 새로운 배열 나옴 -> 원래 배열을 풀어헤쳐서 새로운 배열을 만들겠다!
    return { ...state, todoItems: newList };
  } else if (type === actions.done) {
    const newList = state.todoItems.map((item) => {
      if (item.id === payload.todoId) {
        return {
          ...item, // 객체를 펼침
          done: !item.done, // 기존의 done 값 반대로 변경  ,
        };
      }
      return item; // 나머지 아이템들은 그대로 반환
    });
    return { ...state, todoItems: newList };
  } else if (type === actions.allDone) {
    const newList = state.todoItems.map((item) => {
      return {
        ...item,
        done: payload.done, // 체크박스 상태에 따라 모두 변경
      };
    });
    return { ...state, todoItems: newList };
  }

  return state;
}
