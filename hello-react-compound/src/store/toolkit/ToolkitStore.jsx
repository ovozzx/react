import { configureStore } from "@reduxjs/toolkit";
import { todoSliceStore } from "./slices/todoSlice";
import { Provider } from "react-redux";

// redux-toolit의 Store
// slice_store들의 집합
const toolkitStore = configureStore({
  // store의 state
  reducer: {
    // {todo: [], init(){}, add(){}, done(){}, doneAll(){}}
    todos: todoSliceStore.reducer, // {todo: []} state
  },
});

export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
