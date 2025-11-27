import { configureStore } from "@reduxjs/toolkit";
import { todoSliceStore } from "./slices/todoSlice";
import { Provider } from "react-redux";
import { articleSliceStore } from "./slices/articleSlice";

// redux-toolit의 Store
// slice_store들의 집합
const toolkitStore = configureStore({
  // store의 state
  reducer: {
    // {todo: [], init(){}, add(){}, done(){}, doneAll(){}}
    todos: todoSliceStore.reducer, // {todo: []} state
    articles: articleSliceStore.reducer,
  },
});

export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
