import js from "@eslint/js";

export const fetchGetArticles = async (pageNo = 0) => {
  window.showSpinner();
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
  window.hideSpinner();
  return articleResponseJson; // body에는 list만 줘서 body로 받아오면 안됨 (done, ...)
};

export const fetchGetArticle = async (articleId) => {
  window.showSpinner();
  const fetchResult = await fetch(
    `http://192.168.211.25:8080/api/v1/boards/${articleId}`,
    {
      headers: {
        Authorization: localStorage.getItem("_token_"),
      },
    }
  );
  const json = await fetchResult.json();
  window.hideSpinner();
  return json.body;
};

export const fetchPostArticle = async (subject, file, content) => {
  window.showSpinner();
  // form data에 넣어서 보냄
  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("content", content);

  if (file) {
    formData.append("file", file);
  }

  const fetchResult = await fetch("http://192.168.211.25:8080/api/v1/boards", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("_token_"),
    },
    body: formData, // 파일 보낼때 아니면 json으로
  });

  // 작성하면, 작성한 게시글 id를 돌려줌
  const json = await fetchResult.json();
  window.hideSpinner();
  return json.body;
};

// File 자체(Binary)를 fetch 로 받아온다!
export const fetchFileDownload = async (url) => {
  // const fetchResult = await fetch(url, {
  //   // responseType: "blob",
  // }); // bolb: 바이너리 타입
  // return fetchResult.blob(); // <-- Binary
  window.showSpinner();
  const fetchResult = await fetch(url);
  window.hideSpinner();
  return fetchResult;
};

export const fetchUpdateArticle = async (modifiedArticle) => {
  window.showSpinner();
  const fetchResult = await fetch(
    `http://192.168.211.25:8080/api/v1/boards/${modifiedArticle.id}`,
    {
      method: "put",
      body: JSON.stringify(modifiedArticle),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("_token_"),
      },
    }
  );

  const json = await fetchResult.json();
  window.hideSpinner();
  return json.body;
};

export const fetchDeleteArticle = async (id) => {
  window.showSpinner();
  const fetchResult = await fetch(
    `http://192.168.211.25:8080/api/v1/boards/${id}`,
    {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("_token_"),
      },
    }
  );

  const json = await fetchResult.json();
  window.hideSpinner();
  return json.body;
};
