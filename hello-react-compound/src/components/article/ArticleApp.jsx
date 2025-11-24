import { useEffect, useRef, useState } from "react";
import { fetchAccountInfo, fetchGetJwt } from "../../http/article/login";
import { fetchGetArticles } from "../../http/article/article";

export default function ArticleApp() {
  // 로그인.
  const [account, setAccount] = useState();

  const token = localStorage.getItem("_token_");

  if (token && !account) {
    // 토큰은 있는데 로그인 안되어있을 때
    (async () => {
      const myAccount = await fetchAccountInfo();
      setAccount(myAccount);
    })();
  }

  return (
    <div className="wrapper">
      <header>ARTICLE</header>
      {!account && <Login onPostLogin={setAccount} />}
      {/* account ?? <Login ... => account가 없으면 Login 보여줘라 */}
      {account && (
        <>
          <Account account={account} onPostLogout={setAccount} />
          <ArticleList />
        </>
      )}
      {/* account가 있을 때 보여주기 */}
    </div>
  );
}

function Login({ onPostLogin }) {
  // 여기서만 사용할거라서 export 안 함
  const loginRef = useRef({
    email: undefined,
    password: undefined,
  });

  const onClickLoginHandler = async (loginRef, onPostLogin) => {
    const email = loginRef.email.value;
    const password = loginRef.password.value;
    console.log(email, password);

    const jwt = await fetchGetJwt(email, password);

    localStorage.setItem("_token_", jwt); // 로컬스트리지에 정보 넣음 => 꺼내기

    // console.log(jwt);
    const myAccountInfo = await fetchAccountInfo();
    onPostLogin(myAccountInfo);
  };

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
          onClick={onClickLoginHandler.bind(
            this,
            loginRef.current,
            onPostLogin
          )}
        >
          Sign In
        </button>
        <button type="button">Sign Up</button>
      </div>
    </div>
  );
}

function Account({ account, onPostLogout }) {
  const onLogoutClickHandler = () => {
    localStorage.removeItem("_token_");
    onPostLogout(undefined);
  };

  return (
    <div>
      <div>{account.email}</div>
      <div>{account.name}</div>
      <div>
        <button type="button" onClick={onLogoutClickHandler}>
          Logout
        </button>
      </div>
    </div>
  );
}

function ArticleList() {
  const loadMoreRef = useRef();
  const [articleList, setArticleList] = useState();

  useEffect(() => {
    (async () => {
      const fetchList = await fetchGetArticles();
      setArticleList(fetchList);
    })();
  }, []);
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
          (async () => {
            const nextArticles = await fetchGetArticles(
              articleList.nowPage + 1
            );
            setArticleList((prevArticles) => {
              return {
                ...nextArticles,
                body: {
                  // body 객체 타입
                  count: nextArticles.count,
                  list: [...prevArticles.body.list, ...nextArticles.body.list], // append!
                },
                // done, nowPage 값 바뀔 것!
              };
            });
          })();
        }
      });
    });

    observer.observe(loadMoreRef.current /*target Element */);
  }, [articleList?.nowPage]); // nowPage 바뀌면 실행해라

  return (
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
              <td>{item.subject}</td>
              <td>{item.viewCnt}</td>
              <td>{item.memberVO.name}</td>
              <td>{item.crtDt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!articleList?.done && <div ref={loadMoreRef}>Load more...</div>}
    </>
  );
}
