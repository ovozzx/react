export const fetchGetTodos = async () => {
  const todoResponse = await fetch("http://192.168.211.25:8888/api/v1/task", {
    method: "get",
  }); // 브라우저 기능. method 없어도 default는 get

  const todoJson = await todoResponse.json();

  const todoList = todoJson.body;
  //   dispatcher({ type: actions.init, payload: todoList }); // state 바뀌면 App() 컴포넌트 재실행
  // 컴포넌트디드마운트일때만 fetch해라
  return todoList;
  // async 함수의 반환은 무조건 promise! => await 붙이기
};

export const fetchAddTodo = async (task, dueDate, priority) => {
  const todoResponse = await fetch("http://192.168.211.25:8888/api/v1/task", {
    method: "post",
    headers: {
      "Content-Type": "application/json", // 없으면 415 에러남 (spring한테 @RequestBody가 json이라는 것을 알려줘야 함)
    },
    body: JSON.stringify({ task, dueDate, priority }),
  });

  const todoResponsejson = await todoResponse.json();

  return todoResponsejson.body;
};

export const fetchDoneTodo = async (taskId) => {
  const todoResponse = await fetch(
    `http://192.168.211.25:8888/api/v1/task/${taskId}`,
    { method: "put" }
  );
  const todoResponseJson = await todoResponse.json();
  return todoResponseJson.body;
};

export const fetchAllDoneTodo = async () => {
  const todoResponse = await fetch("http://192.168.211.25:8888/api/v1/task", {
    method: "put",
  });

  const todoResponseJson = await todoResponse.json();
  //   console.log("fetch 응답 : ", todoResponse);
  //   console.log("fetch 응답~~ : ", todoResponseJson.locked);
  return todoResponseJson.body;
};
