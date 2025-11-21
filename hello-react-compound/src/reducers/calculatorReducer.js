export const actions = {
  addHistory: "ADD-HISTORY",
  click: "CLICK",
};

export default function taskReducer(state, action) {
  const type = action.type;
  const payload = action.payload;

  if (type == actions.addHistory) {
    // calcHistory
    // {type: "ADD=HISTORY", payload: {result: "1 * 1 = 1"}}
    const newList = [payload.result, ...state];
    return newList;
  } else if (type == actions.click) {
    return payload;
  }

  return state;
}
