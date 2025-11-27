import articleListStyle from "./ArticleList.module.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { fetchGetJwt } from "../../http/article/login.js";
import {
  fetchDeleteArticle,
  fetchGetArticle,
  fetchGetArticles,
  fetchPostArticle,
  fetchUpdateArticle,
} from "../../http/article/article.js";
import Alert, { Confirm } from "../ui/Modal.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useFetch } from "../../hooks/customHooks.js";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../store/redux/ReduxStore.jsx";
import { download } from "../../utils/download.js";
import { isResourceOwner } from "../../utils/resourceOwner.js";
import {
  articleActions,
  articleThunks,
} from "../../store/toolkit/slices/articleSlice.js";

export default function ArticleApp() {
  // 로그인.
  const { account, login } = useContext(UserContext);

  const token = localStorage.getItem("_token_");
  if (token && !account) {
    login();
  }

  return (
    <div className="wrapper">
      <header>Article</header>
      {!account && <Login />}
      {account && (
        <>
          <Account />
          <ArticleList />
        </>
      )}
    </div>
  );
}

const onClickLoginHandler = async (loginRef, onPostLogin) => {
  const email = loginRef.email.value;
  const password = loginRef.password.value;

  const jwt = await fetchGetJwt(email, password);
  localStorage.setItem("_token_", jwt);

  onPostLogin();
};

function Login() {
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
  const articles = useSelector((store) => store.articles);
  console.log("구독 결과 : ", articles);
  const dispatcher = useDispatch();

  const loadMoreRef = useRef();

  const [isWrite, setIsWrite] = useState(false);
  const [articleId, setArticleId] = useState();

  const [rnd, setRnd] = useState(Math.random());

  const { fetchedData, error } = useFetch(fetchGetArticles, rnd);

  useEffect(() => {
    // dispatcher({ type: actionTypes.ARTICLE_INIT, payload: fetchedData });
    if (fetchedData) dispatcher(articleActions.init(fetchedData)); // 조건 처리 안하면 undefined로 들어
    // console.log("구독2 : ", dispatcher(articleActions.init(fetchedData)));
  }, [fetchedData, dispatcher]);

  const paginationCallback = useCallback(
    (fetchResult) => {
      dispatcher(articleListStyle.next(fetchResult));
    },
    [dispatcher]
  );

  useEffect(() => {
    window.observe(loadMoreRef.current);
    window.addObserveCallback("article-load-more", async () => {
      if (articles?.nowPage >= 0) {
        console.log("Intersect Page go!-->", articles?.nowPage);
        (async () => {
          window.showSpinner();
          try {
            const fetchResult = await fetchGetArticles(articles?.nowPage + 1);
            paginationCallback(fetchResult);
          } finally {
            window.hideSpinner();
          }
        })();
      }
    });
  }, [articles?.nowPage]);

  // const fetchError = usePagination(
  //   loadMoreRef,
  //   fetchGetArticles,
  //   articles.nowPage,
  //   articles.done,
  //   paginationCallback
  // );

  const { account } = useContext(UserContext);

  return (
    <>
      <button type="button" onClick={setIsWrite.bind(this, true)}>
        게시글 작성
      </button>
      <button
        type="button"
        onClick={() => {
          dispatcher(articleThunks.init());
        }}
      >
        게시글 다시 조회
      </button>
      {isWrite && (
        <ArticleWrite
          onPostWrite={(newArticleId, subject) => {
            dispatcher(
              articleThunks.write(setIsWrite, newArticleId, account, subject)
            );
          }}
        />
      )}
      {!isWrite && (
        <>
          <table className={articleListStyle.tableList}>
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
              {articles?.body?.list.map((item) => (
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
          {!articles?.done && (
            <div id="article-load-more" ref={loadMoreRef}>
              Load more...
            </div>
          )}
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
        writeRef.current.file.files[0],
        writeRef.current.content.value
      );
      onPostWrite(writeResult, writeRef.current.subject.value);
    } catch (e) {
      if (e.message.startsWith("{")) {
        const error = JSON.parse(e.message).error;
        let message = "";
        for (let err of error) {
          message += `${err.field} ${err.defaultMessage}`;
        }
        alert(message);
      } else {
        alert(e.message);
      }
    } finally {
      window.hideSpinner();
    }
  }, [onPostWrite]);

  return (
    <div>
      <div>
        <input
          type="text"
          ref={(element) => (writeRef.current.subject = element)}
        />
      </div>
      <div>
        <input
          type="file"
          ref={(element) => (writeRef.current.file = element)}
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

function ArticleDetail({ articleId, onClose }) {
  const dispatcher = useDispatch();

  const detailRef = useRef();
  const deleteConfirmRef = useRef();

  const [modifyDetail, setModifyDetail] = useState();

  const [isModify, setIsModify] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { account } = useContext(UserContext);

  const fetchArticle = useCallback(fetchGetArticle.bind(this, articleId), []);

  const { fetchedData: detail, error } = useFetch(fetchArticle, isDelete);

  useEffect(() => {
    setModifyDetail({ ...detail });
    detailRef.current.open();

    if (isDelete) {
      deleteConfirmRef.current.open();
    }
  }, [detail, isDelete]);

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
                data-file-group-id={fileGroupId}
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
              onClick={() => {
                dispatcher(articleThunks.update(onClose, modifyDetail));
              }}
            >
              저장
            </button>
          )}
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
              onClickOk={() => {
                dispatcher(articleThunks.delete(onClose, detail, setIsDelete));
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
// import articleListStyle from "./ArticleList.module.css";
// // css 이름 원하는대로 작성
// import {
//   useCallback,
//   useContext,
//   useDebugValue,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { fetchGetJwt } from "../../http/article/login.js";
// import {
//   fetchDeleteArticle,
//   fetchFileDownload,
//   fetchGetArticle,
//   fetchGetArticles,
//   fetchPostArticle,
//   fetchUpdateArticle,
// } from "../../http/article/article.js";
// import Alert, { Confirm } from "../ui/Modal.jsx";
// import { download } from "../../utills/download.js";
// import { UserContext } from "../../contexts/UserContext.jsx";
// // import { UserContextProvider } from "../../contexts/UserContextProvider.jsx";
// import { isResourceOwner } from "../../utills/resourceOwner.js";
// import { useFetch, usePagination } from "../../hooks/customHooks.js";
// import { useDispatch, useSelector } from "react-redux";
// import { actionTypes } from "../../store/redux/ReduxStore.jsx";

// export default function ArticleApp() {
//   // 로그인.
//   const { account, login } = useContext(UserContext);

//   const token = localStorage.getItem("_token_");

//   if (token && !account) {
//     login();
//   }

//   return (
//     <div className="wrapper">
//       <header>ARTICLE</header>
//       {!account && <Login />}
//       {/* account ?? <Login ... => account가 없으면 Login 보여줘라 */}
//       {account && (
//         <>
//           <Account />
//           <ArticleList />
//         </>
//       )}
//       {/* account가 있을 때 보여주기 */}
//     </div>
//   );
// }

// const onClickLoginHandler = async (loginRef, onPostLogin) => {
//   const email = loginRef.email.value;
//   const password = loginRef.password.value;
//   //console.log(email, password);

//   const jwt = await fetchGetJwt(email, password);

//   localStorage.setItem("_token_", jwt); // 로컬스트리지에 정보 넣음 => 꺼내기

//   // console.log(jwt);
//   // const myAccountInfo = await fetchAccountInfo();
//   // onPostLogin(myAccountInfo);
//   onPostLogin();
// };

// function Login() {
//   // 여기서만 사용할거라서 export 안 함

//   const { login } = useContext(UserContext);

//   const loginRef = useRef({
//     email: undefined,
//     password: undefined,
//   });

//   return (
//     <div>
//       <div>
//         <input
//           type="email"
//           ref={(element) => (loginRef.current.email = element)}
//         />
//         {/* ()에 태그(input) 자체가 들어옴 */}
//       </div>
//       <div>
//         <input
//           type="password"
//           ref={(element) => (loginRef.current.password = element)}
//         />
//       </div>
//       <div>
//         <button
//           type="button"
//           onClick={onClickLoginHandler.bind(this, loginRef.current, login)}
//         >
//           Sign In
//         </button>
//         <button type="button">Sign Up</button>
//       </div>
//     </div>
//   );
// }

// function Account() {
//   const { account, logout } = useContext(UserContext);

//   return (
//     <div>
//       <div>{account.email}</div>
//       <div>{account.name}</div>
//       <div>
//         <button type="button" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// function ArticleList() {
//   const articles = useSelector((store) => store.articles);
//   const dispatcher = useDispatch();

//   //console.log(">>>>>", articleListStyle);
//   const loadMoreRef = useRef();

//   const [isWrite, setIsWrite] = useState(false);
//   const [articleId, setArticleId] = useState();

//   const [rnd, setRnd] = useState(Math.random());

//   const {
//     fetchedData,
//     error,
//     //setFetchedData: setArticles, // ??
//   } = useFetch(fetchGetArticles, 1); // rnd 바뀌면 fetch 해라 => rnd 일단 뺌

//   console.log("fetchedData : ", fetchedData);
//   // fetch 결과 넣으러면 useEffect 넣어주기~

//   useEffect(() => {
//     dispatcher({ type: actionTypes.ARTICLE_INIT, payload: fetchedData });
//   }, [fetchedData, dispatcher]);

//   //console.log("결과~~~", articleList);
//   // callback 함수쪽 재실행되어서 key 중복 현상 => 함수 캐싱
//   const paginationCallback = useCallback(
//     (fetchResult) => {
//       dispatcher({ type: actionTypes.ARTICLE_NEXT, payload: fetchResult });
//     },
//     [dispatcher]
//   );

//   const fetchError = usePagination(
//     loadMoreRef,
//     fetchGetArticles,
//     articles?.nowPage,
//     articles?.done,
//     paginationCallback
//   );

//   return (
//     <>
//       <button type="button" onClick={setIsWrite.bind(this, true)}>
//         게시글 작성
//       </button>
//       {isWrite && (
//         <ArticleWrite
//           onPostWrite={() => {
//             setIsWrite(false);
//             setRnd(Math.random());
//           }}
//         />
//       )}
//       {!isWrite && (
//         <>
//           <table className={articleListStyle.tableList}>
//             <thead className={articleListStyle.tableList}>
//               <tr>
//                 <th>ID</th>
//                 <th>제목</th>
//                 <th>조회수</th>
//                 <th>작성자</th>
//                 <th>작성시간</th>
//               </tr>
//             </thead>
//             <tbody className={articleListStyle.tableList}>
//               {articles?.body?.list.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.number}</td>
//                   <td onClick={setArticleId.bind(this, item.id)}>
//                     {item.subject}
//                   </td>
//                   <td>{item.viewCnt}</td>
//                   <td>{item.memberVO.name}</td>
//                   <td>{item.crtDt}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {!articles?.done && <div ref={loadMoreRef}>Load more...</div>}
//           {articleId && (
//             <ArticleDetail
//               articleId={articleId}
//               onClose={(articleId) => {
//                 setArticleId(articleId);
//                 setRnd(Math.random());
//               }}
//             />
//           )}
//         </>
//       )}
//     </>
//   );
// }

// function ArticleDetail({ articleId, onClose }) {
//   const dispatcher = useDispatch();

//   const detailRef = useRef();
//   const deleteConfirmRef = useRef();

//   const [modifyDetail, setModifyDetail] = useState();

//   const [isModify, setIsModify] = useState(false);
//   const [isDelete, setIsDelete] = useState(false);

//   const { account } = useContext(UserContext);

//   const fetchArticle = useCallback(fetchGetArticle.bind(this, articleId), []);

//   const { fetchedData: detail, error } = useFetch(
//     fetchArticle, // 캐싱 안하면,, 새로운 메모리 함수 => 계속 돎
//     isDelete
//   );

//   useEffect(() => {
//     // 객체 레퍼런스 타입이라서 동일 메모리에 있는 걸 수정하면 동일하게 바뀜 => 메모리 끊어주는 거 필요
//     setModifyDetail({ ...detail });
//     detailRef.current.open();

//     // 렌더링 끝난 상태
//     if (isDelete) {
//       deleteConfirmRef.current.open();
//     }
//   }, [detail, isDelete]);

//   return (
//     <Alert alertRef={detailRef} onClose={onClose.bind(this, undefined)}>
//       <div>
//         {!isModify ? (
//           detail?.subject
//         ) : (
//           <input
//             type="text"
//             value={modifyDetail?.subject}
//             onChange={(event) => {
//               const value = event.currentTarget.value;

//               setModifyDetail((prevDetail) => {
//                 return { ...prevDetail, subject: value };
//               });
//             }}
//           />
//           // defaultValue는 value와 달리 수정 가능
//         )}
//       </div>
//       <div>
//         {detail?.memberVO.name} ({detail?.memberVO.email})
//       </div>
//       {detail?.fileGroupVO && (
//         <div>
//           {detail.fileGroupVO.file.map(
//             ({ fileDisplayName, fileDownloadCount, fileGroupId, fileId }) => (
//               <div
//                 key={fileId}
//                 dat-file-group-id={fileGroupId}
//                 data-file-id={fileId}
//                 data-article-id={articleId}
//                 onClick={download.bind(
//                   this,
//                   fileDisplayName,
//                   `http://192.168.211.25:8080/file/${articleId}/${fileGroupId}/${fileId}`
//                 )}
//               >
//                 {fileDisplayName} ({fileDownloadCount})
//               </div>
//             )
//           )}
//         </div>
//       )}
//       <div>
//         {!isModify ? (
//           detail?.content
//         ) : (
//           <textarea
//             value={modifyDetail?.content}
//             onChange={(event) => {
//               const value = event.currentTarget.value;
//               setModifyDetail((prevDetail) => {
//                 return { ...prevDetail, content: value };
//               });
//             }}
//           ></textarea>
//         )}
//       </div>
//       {isResourceOwner(account, detail?.memberVO.email) && (
//         <div>
//           {isModify && (
//             <button
//               type="button"
//               onClick={async () => {
//                 dispatcher({
//                   type: actionTypes.ARTICLE_UPDATE,
//                   payload: modifyDetail,
//                 });
//                 window.showSpinner();
//                 try {
//                   const result = await fetchUpdateArticle(modifyDetail);
//                   if (result) {
//                     // 수정에 성공했다면
//                     onClose(undefined);
//                   }
//                 } catch (e) {
//                   if (e.message.startsWith("{")) {
//                     const error = JSON.parse(e.message).error;
//                     let message = "";
//                     for (let err of error) {
//                       // for each
//                       message += `${err.field} ${err.defaultMessage}`;
//                       message += " ";
//                     }
//                     alert(message);
//                   } else {
//                     alert(e.message);
//                   }
//                 } finally {
//                   window.hideSpinner();
//                 }
//               }}
//             >
//               저장
//             </button>
//           )}
//           {/* 수정중일 때는 저장이 보이도록 */}
//           {!isModify && (
//             <button type="button" onClick={setIsModify.bind(this, true)}>
//               수정
//             </button>
//           )}
//           <button type="button" onClick={setIsDelete.bind(this, true)}>
//             삭제
//           </button>
//           {isDelete && (
//             <Confirm
//               doNotMove={true}
//               confirmRef={deleteConfirmRef}
//               onClickOk={async () => {
//                 dispatcher({
//                   type: actionTypes.ARTICLE_DELETE,
//                   payload: { id: detail?.id },
//                 });
//                 window.showSpinner();
//                 try {
//                   const deleteResult = await fetchDeleteArticle(detail?.id);

//                   if (deleteResult) {
//                     setIsDelete(false);
//                     onClose(undefined);
//                   }
//                 } catch (e) {
//                   if (e.message.startsWith("{")) {
//                     const error = JSON.parse(e.message).error;
//                     let message = "";
//                     for (let err of error) {
//                       // for each
//                       message += `${err.field} ${err.defaultMessage}`;
//                       message += " ";
//                     }
//                     alert(message);
//                   } else {
//                     alert(e.message);
//                   }
//                 } finally {
//                   window.hideSpinner();
//                 }
//               }}
//               onClickCancel={setIsDelete.bind(this, false)}
//             >
//               <div>정말 삭제하시겠습니까?</div>
//             </Confirm>
//           )}
//         </div>
//       )}
//     </Alert>
//   );
// }

// function ArticleWrite({ onPostWrite }) {
//   const writeRef = useRef({
//     subject: undefined,
//     file: undefined,
//     content: undefined,
//   });

//   const onSaveClickHandler = useCallback(async () => {
//     // fetch - 글 작성.
//     window.showSpinner();
//     try {
//       const writeResult = await fetchPostArticle(
//         writeRef.current.subject.value,
//         writeRef.current.file.files[0], // 파일 1개만 보낼 것
//         writeRef.current.content.value
//       );
//     } catch (e) {
//       if (e.message.startsWith("{")) {
//         // 객체라는 뜻 (json 형식)
//         //console.log(JSON.parse(e.message));
//         const error = JSON.parse(e.message).error;
//         let message = "";
//         for (let err of error) {
//           // for each
//           message += `${err.field} ${err.defaultMessage}`;
//           message += " ";
//         }
//         alert(message);
//       } else {
//         alert(e.message);
//       }
//     } finally {
//       window.hideSpinner();
//     }

//     onPostWrite();
//   }, [onPostWrite]); // 캐싱, 캐싱시킬 기준

//   return (
//     <div>
//       <div>
//         <input
//           ref={(element) => (writeRef.current.subject = element)}
//           // (element)에 DOM 요소 자체가 들어옴
//           type="text"
//         />
//       </div>
//       <div>
//         <input
//           ref={(element) => (writeRef.current.file = element)}
//           type="file"
//         />
//       </div>
//       <div>
//         <textarea
//           ref={(element) => (writeRef.current.content = element)}
//         ></textarea>
//       </div>
//       <button type="button" onClick={onSaveClickHandler}>
//         저장하기
//       </button>
//       <button type="button" onClick={onPostWrite}>
//         취소하기
//       </button>
//     </div>
//   );
// }
