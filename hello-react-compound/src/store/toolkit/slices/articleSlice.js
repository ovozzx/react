import { createSlice } from "@reduxjs/toolkit";

export const articleSliceStore = createSlice({
  name: "article_slice", // slice store들을 구분지을 이름, action data의 type의 이름, 다른 slice들과 중복되지 않는 이름
  initialState: {
    error: {},
    done: false,
    nowPage: 0,
    body: { count: 0, list: [] },
  }, // todo_slice의 초기 state 값
  reducers: {
    init(
      state /* todo_slice의 상태값 (Store가 관리하는 state의 복제본) */,
      action /* state를 변경시킬 객체 (type, paylaod) */
    ) {
      //   console.log("툴킷 : ", action.payload);
      // console.log("툴킷~~ : ", action.payload?.body);
      //   return { ...state, articles: { ...action.payload?.body.list } };
      //   state.push(...action.payload?.body.list);
      // fetch 타이밍....
      console.log("툴킷~~ ", action.payload);
      state.error = {};
      //const payload = action.payload;
      //console.log("툴킷 : ", payload);
      state.done = action.payload.done;
      state.nowPage = action.payload.nowPage;
      state.body.count = action.payload.body.count;
      state.body.list = action.payload.body.list;
      //return { ...state, articles: { ...action.payload } };
    },
    next(state, action) {
      state.error = {};
      state.done = action.payload.done;
      state.nowPage = action.payload.nowPage;
      state.body.count = action.payload.body.count;
      state.body.list = action.payload.body.list;

      //   articles.

      //   return {
      //     ...state,
      //     articles: {
      //       ...state.articles,
      //       done: action.payload.done,
      //       nowPage: action.payload.nowPage,
      //       body: {
      //         count: action.payload.body.count,
      //         list: [
      //           ...state.store.articles.body.list,
      //           ...action.payload.body.list,
      //         ],
      //       },
      //     },
      //   };
    },
    write(state, action) {
      state.error = {};
      const payload = action.payload;
      console.log("쓰기", payload);
      state.body.count++;
      state.body.list.unshift({
        id: payload.id,
        number: Math.max(...state.body.list.map((art) => art.number)) + 1,
        memberVO: { email: payload.email, name: payload.name },
        crtDt: new Date().toISOString().substr(0, 10),
        subject: payload.subject,
        content: payload.content,
      });
    },
    update(state, action) {
      state.error = {};
      const payload = action.payload;
      console.log("수정", payload);
      state.body.list.map((article) => {
        if (payload.id == article.id) {
          article.subject = payload.subject;
          article.content = payload.content;
        }
      });
    },
    delete(state, action) {
      state.error = {};
      const payload = action.payload;
      console.log("삭제", payload);
      state.body.count--;
      state.body.list.filter((article) => {
        payload.id != article.id;
      });
    },
  },
});

export const articleActions = articleSliceStore.actions;

export const articleThunks = {
  init(
    state /* todo_slice의 상태값 (Store가 관리하는 state의 복제본) */,
    action /* state를 변경시킬 객체 (type, paylaod) */
  ) {
    console.log("툴킷~~ ", action.payload);
    state.error = {};
    //const payload = action.payload;
    //console.log("툴킷 : ", payload);
    state.done = action.payload.done;
    state.nowPage = action.payload.nowPage;
    state.body.count = action.payload.body.count;
    state.body.list = action.payload.body.list;
    //return { ...state, articles: { ...action.payload } };
  },
  next(state, action) {
    state.error = {};
    state.done = action.payload.done;
    state.nowPage = action.payload.nowPage;
    state.body.count = action.payload.body.count;
    state.body.list = action.payload.body.list;
  },
  write(state, action) {
    state.error = {};
    const payload = action.payload;
    console.log("쓰기", payload);
    state.body.count++;
    state.body.list.unshift({
      id: payload.id,
      number: Math.max(...state.body.list.map((art) => art.number)) + 1,
      memberVO: { email: payload.email, name: payload.name },
      crtDt: new Date().toISOString().substr(0, 10),
      subject: payload.subject,
      content: payload.content,
    });
  },
  update(state, action) {
    state.error = {};
    const payload = action.payload;
    console.log("수정", payload);
    state.body.list.map((article) => {
      if (payload.id == article.id) {
        article.subject = payload.subject;
        article.content = payload.content;
      }
    });
  },
  delete(state, action) {
    state.error = {};
    const payload = action.payload;
    console.log("삭제", payload);
    state.body.count--;
    state.body.list.filter((article) => {
      payload.id != article.id;
    });
  },
};
