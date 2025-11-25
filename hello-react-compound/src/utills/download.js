import { fetchFileDownload } from "../http/article/article.js";

export const download = async (filename, url) => {
  // 실제 파일은 fetch에서
  const binary = await fetchFileDownload(url);
  console.log(binary);

  // binary를 다운로드 가능한 형태로 생성
  const blob = await binary.blob();
  const data = window.URL.createObjectURL(blob);

  // data를 사용자의 PC에 저장
  const anchor = document.createElement("a");
  anchor.href = data; // 다운로드받을 blob을 셋팅
  anchor.download = filename || "download";

  // anchor를 <body>에 추가
  document.body.appendChild(anchor);

  // anchor를 클릭
  anchor.click();
  window.URL.revokeObjectURL(data);

  // anchor를 삭제
  document.body.removeChild(anchor);
};
