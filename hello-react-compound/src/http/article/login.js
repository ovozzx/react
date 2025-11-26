export const fetchGetJwt = async (email, password) => {
  const todoResponse = await fetch("http://192.168.211.25:8080/auth", {
    method: "post",
    headers: {
      "Content-Type": "application/json", // 없으면 415 에러남 (spring한테 @RequestBody가 json이라는 것을 알려줘야 함)
    },
    body: JSON.stringify({ email, password }),
  });

  const todoJson = await todoResponse.json();
  const todoResponsejson = todoJson.body;
  return todoResponsejson;
};

export const fetchAccountInfo = async () => {
  const fetchResult = await fetch("http://192.168.211.25:8080/api/v1/account", {
    headers: {
      Authorization: localStorage.getItem("_token_"), // 토큰 가져오기
    },
  });

  console.log(fetchResult);

  const json = await fetchResult.json();

  console.log(json);

  return json.body;
};
