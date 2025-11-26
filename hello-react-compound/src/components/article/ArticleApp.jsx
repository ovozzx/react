import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { fetchGetJwt } from "../../http/article/login.js";
import {
  fetchDeleteArticle,
  fetchFileDownload,
  fetchGetArticle,
  fetchGetArticles,
  fetchPostArticle,
  fetchUpdateArticle,
} from "../../http/article/article.js";
import Alert, { Confirm } from "../ui/Modal.jsx";
import { download } from "../../utills/download.js";
import { UserContext } from "../../contexts/UserContext.jsx";
// import { UserContextProvider } from "../../contexts/UserContextProvider.jsx";
import { isResourceOwner } from "../../utills/resourceOwner.js";

export default function ArticleApp() {
  // 로그인.
  const { account, login } = useContext(UserContext);

  const token = localStorage.getItem("_token_");

  if (token && !account) {
    login();
  }

  return (
    <div className="wrapper">
      <header>ARTICLE</header>
      {!account && <Login />}
      {/* account ?? <Login ... => account가 없으면 Login 보여줘라 */}
      {account && (
        <>
          <Account />
          <ArticleList />
        </>
      )}
      {/* account가 있을 때 보여주기 */}
    </div>
  );
}

const onClickLoginHandler = async (loginRef, onPostLogin) => {
  const email = loginRef.email.value;
  const password = loginRef.password.value;
  console.log(email, password);

  const jwt = await fetchGetJwt(email, password);

  localStorage.setItem("_token_", jwt); // 로컬스트리지에 정보 넣음 => 꺼내기

  // console.log(jwt);
  // const myAccountInfo = await fetchAccountInfo();
  // onPostLogin(myAccountInfo);
  onPostLogin();
};

function Login() {
  // 여기서만 사용할거라서 export 안 함

  const { login } = useContext(UserContext);

  const loginRef = useRef({
    email: undefined,
    password: undefined,
  });

  return (
    <div>
      <div>
        <input
          type="email"
          ref={(element) => (loginRef.current.email = element)}
        />
        {/* ()에 태그(input) 자체가 들어옴 */}
      </div>
      <div>
        <input
          type="password"
          ref={(element) => (loginRef.current.password = element)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={onClickLoginHandler.bind(this, loginRef.current, login)}
        >
          Sign In
        </button>
        <button type="button">Sign Up</button>
      </div>
    </div>
  );
}

function Account() {
  const { account, logout } = useContext(UserContext);

  return (
    <div>
      <div>{account.email}</div>
      <div>{account.name}</div>
      <div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function ArticleList() {
  const loadMoreRef = useRef();

  const [isWrite, setIsWrite] = useState(false);
  const [articleId, setArticleId] = useState();
  const [articleList, setArticleList] = useState();

  const [rnd, setRnd] = useState(Math.random());

  useEffect(() => {
    (async () => {
      window.showSpinner();
      try {
        const fetchList = await fetchGetArticles();
        setArticleList(fetchList);
      } catch (e) {
        if (e.message.startsWith("{")) {
          const error = JSON.parse(e.message).error;
          let message = "";
          for (let err of error) {
            // for each
            message += `${err.field} ${err.defaultMessage}`;
            message += " ";
          }
          alert(message);
        } else {
          alert(e.message);
        }
      } finally {
        window.hideSpinner();
      }
    })();
  }, [rnd]);
  // fetch 결과 넣으러면 useEffect 넣어주기~

  //console.log("결과~~~", articleList);

  useEffect(() => {
    // render 끝나면 실행!
    // Pagination : view포트 밖에 있는걸 스크롤 내렸을 때 교차하는게 있는지 감지 (브라우저 기능)
    const observer = new IntersectionObserver((elements) => {
      elements.forEach((elem) => {
        if (elem.isIntersecting) {
          // fetch next page
          //   console.log("fetch!!");
          if (articleList?.nowPage >= 0) {
            // 괄호 찾기
            // 구독 한번만 하게함 (구독 취소 -> 다시 구독)
            observer.unobserve(loadMoreRef.current);
            (async () => {
              window.showSpinner();
              try {
                const nextArticles = await fetchGetArticles(
                  articleList.nowPage + 1
                );
                setArticleList((prevArticles) => {
                  return {
                    ...nextArticles,
                    body: {
                      // body 객체 타입
                      count: nextArticles.count,
                      list: [
                        ...prevArticles.body.list,
                        ...nextArticles.body.list,
                      ], // append!
                    },
                    // done, nowPage 값 바뀔 것!
                  };
                });
              } catch (e) {
                if (e.message.startsWith("{")) {
                  const error = JSON.parse(e.message).error;
                  let message = "";
                  for (let err of error) {
                    // for each
                    message += `${err.field} ${err.defaultMessage}`;
                    message += " ";
                  }
                  alert(message);
                } else {
                  alert(e.message);
                }
              } finally {
                window.hideSpinner();
              }
            })();
          }
        }
      });
    });

    if (!articleList?.done) {
      /* articleList?.done이 true (마지막 페이지)이면 loadMoreRef도 없음 (return 문 참고)
        -> 체크 필요 (없는 걸 observe하려고 하면 에러) */
      observer.observe(loadMoreRef.current /*target Element */);
    }
  }, [articleList?.nowPage, articleList?.done]); // nowPage 바뀌면 실행해라

  return (
    <>
      <button type="button" onClick={setIsWrite.bind(this, true)}>
        게시글 작성
      </button>
      {isWrite && (
        <ArticleWrite
          onPostWrite={() => {
            setIsWrite(false);
            setRnd(Math.random());
          }}
        />
      )}
      {!isWrite && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>제목</th>
                <th>조회수</th>
                <th>작성자</th>
                <th>작성시간</th>
              </tr>
            </thead>
            <tbody>
              {articleList?.body.list.map((item) => (
                <tr key={item.id}>
                  <td>{item.number}</td>
                  <td onClick={setArticleId.bind(this, item.id)}>
                    {item.subject}
                  </td>
                  <td>{item.viewCnt}</td>
                  <td>{item.memberVO.name}</td>
                  <td>{item.crtDt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!articleList?.done && <div ref={loadMoreRef}>Load more...</div>}
          {articleId && (
            <ArticleDetail
              articleId={articleId}
              onClose={(articleId) => {
                setArticleId(articleId);
                setRnd(Math.random());
              }}
            />
          )}
        </>
      )}
    </>
  );
}

function ArticleDetail({ articleId, onClose }) {
  const detailRef = useRef();
  const deleteConfirmRef = useRef();

  const [detail, setDetail] = useState();
  const [modifyDetail, setModifyDetail] = useState();

  const [isModify, setIsModify] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { account } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      window.showSpinner();
      try {
        const articleDetail = await fetchGetArticle(articleId);
        console.log(articleDetail);
        setDetail(articleDetail); // 값은 같지만 메모리는 다르게 끊어줌
        setModifyDetail({ ...articleDetail });
        // 객체 레퍼런스 타입이라서 동일 메모리에 있는 걸 수정하면 동일하게 바뀜 => 메모리 끊어주는 거 필요
        detailRef.current.open();

        // 렌더링 끝난 상태
        if (isDelete) {
          deleteConfirmRef.current.open();
          console.log("오픈!");
        }
      } catch (e) {
        if (e.message.startsWith("{")) {
          const error = JSON.parse(e.message).error;
          let message = "";
          for (let err of error) {
            // for each
            message += `${err.field} ${err.defaultMessage}`;
            message += " ";
          }
          alert(message);
        } else {
          alert(e.message);
        }
      } finally {
        window.hideSpinner();
      }
    })();
  }, [isDelete]); // articleId처럼 외부 변수 쓰면 의존 배열에 넣어줄 것을 권고
  // props 변경되면 이 실행문도 다시 실행되어서 넣을 필요 없음

  return (
    <Alert alertRef={detailRef} onClose={onClose.bind(this, undefined)}>
      <div>
        {!isModify ? (
          detail?.subject
        ) : (
          <input
            type="text"
            value={modifyDetail?.subject}
            onChange={(event) => {
              const value = event.currentTarget.value;

              setModifyDetail((prevDetail) => {
                return { ...prevDetail, subject: value };
              });
            }}
          />
          // defaultValue는 value와 달리 수정 가능
        )}
      </div>
      <div>
        {detail?.memberVO.name} ({detail?.memberVO.email})
      </div>
      {detail?.fileGroupVO && (
        <div>
          {detail.fileGroupVO.file.map(
            ({ fileDisplayName, fileDownloadCount, fileGroupId, fileId }) => (
              <div
                key={fileId}
                dat-file-group-id={fileGroupId}
                data-file-id={fileId}
                data-article-id={articleId}
                onClick={download.bind(
                  this,
                  fileDisplayName,
                  `http://192.168.211.25:8080/file/${articleId}/${fileGroupId}/${fileId}`
                )}
              >
                {fileDisplayName} ({fileDownloadCount})
              </div>
            )
          )}
        </div>
      )}
      <div>
        {!isModify ? (
          detail?.content
        ) : (
          <textarea
            value={modifyDetail?.content}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setModifyDetail((prevDetail) => {
                return { ...prevDetail, content: value };
              });
            }}
          ></textarea>
        )}
      </div>
      {isResourceOwner(account, detail?.memberVO.email) && (
        <div>
          {isModify && (
            <button
              type="button"
              onClick={async () => {
                window.showSpinner();
                try {
                  const result = await fetchUpdateArticle(modifyDetail);
                  if (result) {
                    // 수정에 성공했다면
                    onClose(undefined);
                  }
                } catch (e) {
                  if (e.message.startsWith("{")) {
                    const error = JSON.parse(e.message).error;
                    let message = "";
                    for (let err of error) {
                      // for each
                      message += `${err.field} ${err.defaultMessage}`;
                      message += " ";
                    }
                    alert(message);
                  } else {
                    alert(e.message);
                  }
                } finally {
                  window.hideSpinner();
                }
              }}
            >
              저장
            </button>
          )}
          {/* 수정중일 때는 저장이 보이도록 */}
          {!isModify && (
            <button type="button" onClick={setIsModify.bind(this, true)}>
              수정
            </button>
          )}
          <button type="button" onClick={setIsDelete.bind(this, true)}>
            삭제
          </button>
          {isDelete && (
            <Confirm
              doNotMove={true}
              confirmRef={deleteConfirmRef}
              onClickOk={async () => {
                window.showSpinner();
                try {
                  const deleteResult = await fetchDeleteArticle(detail?.id);
                  console.log("onClickOk");
                  if (deleteResult) {
                    setIsDelete(false);
                    onClose(undefined);
                    console.log("onClickOK > deleteResult");
                  }
                } catch (e) {
                  if (e.message.startsWith("{")) {
                    const error = JSON.parse(e.message).error;
                    let message = "";
                    for (let err of error) {
                      // for each
                      message += `${err.field} ${err.defaultMessage}`;
                      message += " ";
                    }
                    alert(message);
                  } else {
                    alert(e.message);
                  }
                } finally {
                  window.hideSpinner();
                }
              }}
              onClickCancel={setIsDelete.bind(this, false)}
            >
              <div>정말 삭제하시겠습니까?</div>
            </Confirm>
          )}
        </div>
      )}
    </Alert>
  );
}

function ArticleWrite({ onPostWrite }) {
  const writeRef = useRef({
    subject: undefined,
    file: undefined,
    content: undefined,
  });

  const onSaveClickHandler = useCallback(async () => {
    // fetch - 글 작성.
    window.showSpinner();
    try {
      const writeResult = await fetchPostArticle(
        writeRef.current.subject.value,
        writeRef.current.file.files[0], // 파일 1개만 보낼 것
        writeRef.current.content.value
      );
    } catch (e) {
      if (e.message.startsWith("{")) {
        // 객체라는 뜻 (json 형식)
        console.log(JSON.parse(e.message));
        const error = JSON.parse(e.message).error;
        let message = "";
        for (let err of error) {
          // for each
          message += `${err.field} ${err.defaultMessage}`;
          message += " ";
        }
        alert(message);
      } else {
        alert(e.message);
      }
    } finally {
      window.hideSpinner();
    }

    onPostWrite();
  }, [onPostWrite]); // 캐싱, 캐싱시킬 기준

  return (
    <div>
      <div>
        <input
          ref={(element) => (writeRef.current.subject = element)}
          // (element)에 DOM 요소 자체가 들어옴
          type="text"
        />
      </div>
      <div>
        <input
          ref={(element) => (writeRef.current.file = element)}
          type="file"
        />
      </div>
      <div>
        <textarea
          ref={(element) => (writeRef.current.content = element)}
        ></textarea>
      </div>
      <button type="button" onClick={onSaveClickHandler}>
        저장하기
      </button>
      <button type="button" onClick={onPostWrite}>
        취소하기
      </button>
    </div>
  );
}
