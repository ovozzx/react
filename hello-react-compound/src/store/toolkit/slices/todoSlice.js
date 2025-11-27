import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddTodo,
  fetchAllDoneTodo,
  fetchDoneTodo,
  fetchGetTodos,
} from "../../../http/todo/todoFetch";

export const todoSliceStore = createSlice({
  name: "todo_slice", // slice store들을 구분지을 이름, action data의 type의 이름, 다른 slice들과 중복되지 않는 이름
  initialState: [], // todo_slice의 초기 state 값
  reducers: {
    init(
      state /* todo_slice의 상태값 (Store가 관리하는 state의 복제본) */,
      action /* state를 변경시킬 객체 (type, paylaod) */
    ) {
      console.log(action);
      // slice의 state는 메모리 값이 변경되면 절대 안된다! 복제본의 메모리를 항상 유지시켜야 한다!!
      // state = [...payload]; 이렇게 쓰면 안됨
      if (state.length === 0) {
        state.push(...action.payload); // 이렇게 하면 같은 TODO 중복 등록됨 => StrictMode 때문에 두번씩 실행됨 => if 체크 필요
      }
    },
    add(state, action) {
      console.log(action);
      state.push(action.payload);
    },
    done(state, action) {
      console.log(action);
      // action.payload.id로 전달된 todo의 인덱스를 찾는다
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      // 헤당 인덱스의 done 값을 true로 변경한다
      state[index].done = true;
    },
    doneAll(state, action) {
      // doneAll에서는 action 쓰이지 않음
      console.log(action);
      for (let todo of state) {
        todo.done = true;
      }
    },
  }, // todo_slice의 state를 변경시킬 reducer 함수들의 집합
});

// slice store의 action을 공개
// {todo_slice/init() {}, todo_slice/add() {}}
export const todoActions = todoSliceStore.actions;

// Thunk
// 액션 생성자 == 커스텀 액션
// 여러가지 action을 하나의 action에서 처리하고 싶을 때 사용
// - fetch와 action을 동시에 사용
export const todoThunks = {
  init() {
    return async (dispatcher) => {
      const todoList = await fetchGetTodos(); // await으로 원하는 데이터 받아오기
      dispatcher(todoActions.init(todoList)); // toolkit으로 전환
    };
  },
  add(taskName, dueDate, priority) {
    const thunks = this;
    return async (dispatcher) => {
      const addResult = await fetchAddTodo(taskName, dueDate, priority);

      //   setRandom(Math.random());

      dispatcher(
        todoActions.add({
          id: addResult.taskId,
          task: addResult.task,
          dueDate: addResult.dueDate,
          priority: addResult.priority,
          done: false,
        })
      );

      // 객체 내부에서 다른 함수나 변수나 상수에 접근하려면 this 키워드를 이용
      thunks.init()(dispatcher);
    };
  },
  done(todoId) {
    return async (dispatcher) => {
      const response = await fetchDoneTodo(todoId);
      dispatcher(todoActions.done({ id: todoId })); // 안에 값이 payload에 들어감
      this.init()(dispatcher);
    };
  },
  doneAll(event) {
    return async (dispatcher) => {
      const isAllDone = event.currentTarget.checked;
      if (isAllDone) {
        await fetchAllDoneTodo();
        dispatcher(todoActions.doneAll());
      }
    };
  },
};
