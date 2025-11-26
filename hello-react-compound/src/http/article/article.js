import js from "@eslint/js";

export const fetchGetArticles = async (pageNo = 0) => {
  // window.showSpinner(); // 에러 발생하면 안 꺼짐
  const fetchResult = await fetch(
    `http://192.168.211.25:8080/api/v1/boards?pageNo=${pageNo}&listSize=20`,
    {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("_token_"),
      },
    }
  );

  if (!fetchResult.ok) {
    throw new Error("서버와 통신에 실패했습니다.");
  }

  const json = await fetchResult.json();

  if (json.error) {
    // json.error는 객체 형태
    throw new Error(JSON.stringify(json.error));
  }
  // window.hideSpinner();
  return json; // body에는 list만 줘서 body로 받아오면 안됨 (done, ...)
};

export const fetchGetArticle = async (articleId) => {
  const fetchResult = await fetch(
    `http://192.168.211.25:8080/api/v1/boards/${articleId}`,
    {
      headers: {
        Authorization: localStorage.getItem("_token_"),
      },
    }
  );

  if (!fetchResult.ok) {
    throw new Error("서버와 통신에 실패했습니다.");
  }
  const json = await fetchResult.json();

  if (json.error) {
    throw new Error(JSON.stringify(json.error));
  }

  return json.body;
};

export const fetchPostArticle = async (subject, file, content) => {
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

  console.log(fetchResult);

  if (!fetchResult.ok) {
    throw new Error("서버와 통신에 실패했습니다.");
  }
  // 작성하면, 작성한 게시글 id를 돌려줌
  const json = await fetchResult.json();

  console.log(json);

  if (json.error) {
    throw new Error(JSON.stringify(json.error));
  }

  return json.body;
};

// File 자체(Binary)를 fetch 로 받아온다!
export const fetchFileDownload = async (url) => {
  // const fetchResult = await fetch(url, {
  //   // responseType: "blob",
  // }); // bolb: 바이너리 타입
  // return fetchResult.blob(); // <-- Binary

  const fetchResult = await fetch(url);

  if (!fetchResult.ok) {
    throw new Error("서버와 통신에 실패했습니다.");
  }

  return fetchResult;
};

export const fetchUpdateArticle = async (modifiedArticle) => {
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

  if (!fetchResult.ok) {
    throw new Error("서버와 통신에 실패했습니다.");
  }

  const json = await fetchResult.json();

  if (json.error) {
    throw new Error(JSON.stringify(json.error));
  }
  return json.body;
};

export const fetchDeleteArticle = async (id) => {
  const fetchResult = await fetch(
    `http://192.168.211.25:8080/api/v1/boards/${id}`,
    {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("_token_"),
      },
    }
  );

  if (!fetchResult.ok) {
    throw new Error("서버와 통신에 실패했습니다.");
  }

  const json = await fetchResult.json();

  if (json.error) {
    throw new Error(JSON.stringify(json.error));
  }

  return json.body;
};
