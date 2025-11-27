import { Provider } from "react-redux";
import { createStore } from "redux";

export const actionTypes = {
  TODO_INIT: "todo/init",
  TODO_ADD: "todo/add",
  TODO_DONE: "todo/done",
  TODO_ALL_DONE: "todo/all-done",
  ARTICLE_INIT: "article/init",
  ARTICLE_NEXT: "article/next",
  ARTICLE_WRITE: "article/write",
  ARTICLE_UPDATE: "article/update",
  ARTICLE_DELETE: "article/delete",
};

const reduxReducers = (store = { todos: [], articles: {} }, action) => {
  // 초기 store state,
  const type = action.type;
  const payload = action.payload;

  if (type === actionTypes.TODO_INIT) {
    return { ...store, todos: [...payload] };
  } else if (type === actionTypes.TODO_ADD) {
    return { ...store, todos: [...store.todos, payload] };
  } else if (type === actionTypes.TODO_DONE) {
    return {
      ...store,
      todos: store.todos.map((todo) => {
        if (payload.id === todo.id) {
          todo.done = true;
        }
        return todo;
      }),
    };
  } else if (type === actionTypes.TODO_ALL_DONE) {
    return {
      ...store,
      todos: store.todos.map((todo) => {
        todo.done = true;
        return todo;
      }),
    };
  } else if (type === actionTypes.ARTICLE_INIT) {
    return { ...store, articles: { ...payload } };
  } else if (type === actionTypes.ARTICLE_NEXT) {
    return {
      ...store,
      articles: {
        ...store.articles,
        done: payload.done,
        nowPage: payload.nowPage,
        body: {
          count: payload.body.count,
          list: [...store.articles.body.list, ...payload.body.list],
        },
      },
    };
  } else if (type === actionTypes.ARTICLE_WRITE) {
    return {
      ...store,
      articles: {
        ...store.articles,
        body: {
          ...store.articles.body,
          list: [
            {
              ...payload,
              number:
                Math.max(...store.articles.body.list.map((art) => art.number)) +
                1,
            },
            ...store.articles.body.list,
          ],
        },
      },
    };
  } else if (type === actionTypes.ARTICLE_UPDATE) {
    return {
      ...store,
      articles: {
        ...store.articles,
        body: {
          ...store.articles.body,
          list: store.articles.body.list.map((article) => {
            if (article.id === payload.id) {
              article.subject = payload.subject;
              article.content = payload.content;
            }
            return article;
          }),
        },
      },
    };
  } else if (type === actionTypes.ARTICLE_DELETE) {
    return {
      ...store,
      articles: {
        ...store.articles,
        body: {
          count: store.articles.body.count - 1,
          list: store.articles.body.list.filter(
            (article) => article.id != payload.id
          ),
        },
      },
    };
  }

  return store;
};

export default function ReduxProvider({ children }) {
  // store 생성
  const store = createStore(reduxReducers);
  return <Provider store={store}>{children}</Provider>;
}
