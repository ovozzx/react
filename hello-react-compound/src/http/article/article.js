export const fetchGetArticles = async (pageNo = 0) => {
  const articleResponse = await fetch(
    `http://192.168.211.25:8080/api/v1/boards?pageNo=${pageNo}&listSize=20`,
    {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("_token_"),
      },
    }
  );
  const articleResponseJson = await articleResponse.json();

  return articleResponseJson; // body에는 list만 줘서 body로 받아오면 안됨 (done, ...)
};
